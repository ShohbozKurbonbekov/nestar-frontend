"use client";

import { getJwtToken } from "@/libs/auth";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { serverApi } from "@/libs/config";
import { sweetMixinErrorAlert } from "@/libs/sweetAlert";
import { RHFInput } from "./property/RHFInput";
import { uploadSingleImage } from "@/libs/utils/uploadSingleImage";

interface ProfileFormContentType {
  onUpdateProfile: (value: any) => Promise<void>;
}
export default function ProfileFormContent({
  onUpdateProfile,
}: ProfileFormContentType) {
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const token = getJwtToken();
  const image: string = watch("memberImage");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ----------------------------------------- Handlers ------------------------------------------
  const uploadImage = async (e: any) => {
    try {
      if (!e.target.files[0] || !token) return;
      const uploadedImage = await uploadSingleImage(
        e.target.files[0],
        "member",
        token,
      );
      setValue("memberImage", uploadedImage);
    } catch (error: any) {
      console.log("Error in uploading image: ", error);
      await sweetMixinErrorAlert(error.message);
    }
  };

  return (
    <Box className="w-full  p-4 bg-white">
      {/*Profile Info*/}
      <Box className="grid grid-cols-12 gap-3 my-5">
        <div className="col-span-12 md:col-span-6">
          <TextField
            placeholder="Phone"
            fullWidth
            {...register("memberPhone")}
            error={!!errors.memberPhone}
            helperText={errors.memberPhone?.message as string}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(148, 163, 184, 1)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(148, 163, 184, 1)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(148, 163, 184, 1)",
                },
              },
            }}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <RHFInput name="memberNick" label="Nickname" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <RHFInput name="memberFullName" label="Fullname" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <RHFInput name="memberAddress" label="Address" />
        </div>
        <div className="col-span-12">
          <RHFInput name="memberDesc" label="Biography" multiline rows={4} />
        </div>
      </Box>
      {/*Profile image */}
      <Box className="border-2 border-slate-400 border-dashed rounded-xl p-6 text-center ">
        <Typography variant="h6" className="mb-2 text-gray-700">
          Upload Image
        </Typography>

        <Typography variant="body2" className="mb-4 text-gray-500">
          Only PNG / JPG
        </Typography>

        <Tooltip title="Choose another image">
          <Button
            variant="outlined"
            onClick={() => inputRef.current?.click()}
            className="capitalize px-3"
          >
            Browse File
          </Button>
        </Tooltip>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/png, image/jpeg"
          onChange={uploadImage}
        />

        {/* Preview */}
        <Box className="w-full mt-4">
          <img
            src={`${serverApi}/${image}`}
            className="w-full h-60 lg:h-74 object-cover rounded-lg object-center"
          />
        </Box>
      </Box>
      <Box className="my-5 text-end">
        {isSubmitting ? (
          <Button
            disabled
            className="capitalize bg-slate-100 rounded-xl py-2 px-3"
          >
            <CircularProgress
              color="success"
              size={20}
              className="text-slate-500 mr-3"
            />
            Submitting
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit(onUpdateProfile)}
            className="capitalize"
          >
            Save
          </Button>
        )}
      </Box>
    </Box>
  );
}
