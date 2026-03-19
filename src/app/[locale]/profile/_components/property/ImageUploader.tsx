// ImageUploader.tsx

"use client";

import { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import { getJwtToken } from "@/libs/auth";
import { serverApi } from "@/libs/config";

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setValue, watch } = useFormContext();
  const token = getJwtToken();
  const images: string[] = watch("propertyImages") || [];

  const uploadImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();

    formData.append(
      "operations",
      JSON.stringify({
        query: `mutation ($files: [Upload!]!) {
          imagesUploader(files: $files, target: "property")
        }`,
        variables: { files: Array(files.length).fill(null) },
      }),
    );

    const map: any = {};
    Array.from(files).forEach((_, i) => {
      map[i] = [`variables.files.${i}`];
    });

    formData.append("map", JSON.stringify(map));

    Array.from(files).forEach((file, i) => {
      formData.append(`${i}`, file);
    });

    const res = await axios.post(
      process.env.NEXT_PUBLIC_GRAPHQL_URL!,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "apollo-require-preflight": true,
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const uploaded = res.data.data.imagesUploader;

    setValue("propertyImages", [...images, ...uploaded]);
  };

  return (
    <Box className="border-2 border-slate-400 border-dashed rounded-xl p-6 text-center">
      <Typography variant="h6" className="mb-2">
        Upload Images
      </Typography>

      <Typography variant="body2" className="mb-4 text-gray-500">
        PNG / JPG — max 5 files
      </Typography>

      <Button
        variant="outlined"
        onClick={() => inputRef.current?.click()}
        className="capitalize"
      >
        Browse Files
      </Button>

      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept="image/png, image/jpeg"
        onChange={(e) => uploadImages(e.target.files)}
      />

      {/* Preview */}
      <Box className="grid grid-cols-3 gap-3 mt-4">
        {images.map((img: string, idx: number) => (
          <img
            key={idx}
            src={`${serverApi}/${img}`}
            className="w-full h-24 lg:h-32 object-cover rounded-lg"
          />
        ))}
      </Box>
    </Box>
  );
};
