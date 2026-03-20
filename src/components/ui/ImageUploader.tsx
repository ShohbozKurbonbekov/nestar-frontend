"use client";

import { useRef } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import { getJwtToken } from "@/libs/auth";
import { serverApi } from "@/libs/config";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { sweetErrorAlert, sweetMixinErrorAlert } from "@/libs/sweetAlert";

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setValue, watch } = useFormContext();
  const token = getJwtToken();
  const images: string[] = watch("propertyImages") || [];

  const uploadImages = async (files: FileList | null) => {
    try {
      if (!files || !files.length) return;
      if (files.length > 6) throw new Error("Max 6 images are required");

      const formData = new FormData();
      formData.append(
        "operations",
        JSON.stringify({
          query: `mutation ImagesUploader($files: [Upload!]!, $target: String!) { 
      imagesUploader(files: $files, target: $target)
    }`,
          variables: {
            files: Array(files.length).fill(null),
            target: "property",
          },
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
    } catch (error: any) {
      console.log("Error in uploading images: ", error);
      await sweetMixinErrorAlert(error.message);
    }
  };

  return (
    <Box className="border-2 border-slate-400 border-dashed rounded-xl p-6 text-center">
      <Typography variant="h6" className="mb-2 text-gray-700">
        Upload Images
      </Typography>

      <Typography variant="body2" className="mb-4 text-gray-500">
        PNG / JPG — max 6 files
      </Typography>

      <Button
        variant="outlined"
        onClick={() => inputRef.current?.click()}
        className="capitalize"
      >
        Browse Files
      </Button>
      <Tooltip title="Reset images" className="ml-2 border border-blue-300 p-1">
        <IconButton onClick={() => setValue("propertyImages", [])}>
          <RestartAltIcon className="text-blue-600" />
        </IconButton>
      </Tooltip>
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
