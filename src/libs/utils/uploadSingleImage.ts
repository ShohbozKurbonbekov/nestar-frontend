import axios from "axios";

const SINGLE_IMAGE_UPLOAD = `mutation ImageUploader($file: Upload!, $target: String!) {
						imageUploader(file: $file, target: $target)}`;

export const uploadSingleImage = async (
  file: File,
  imagePath: string,
  accessToken: string,
  mutationName = SINGLE_IMAGE_UPLOAD,
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append(
      "operations",
      JSON.stringify({
        query: SINGLE_IMAGE_UPLOAD,
        variables: {
          file: null,
          target: imagePath,
        },
      }),
    );

    formData.append("map", JSON.stringify({ "0": [`variables.file`] }));

    formData.append("0", file);
    const res = await axios.post(
      process.env.NEXT_PUBLIC_GRAPHQL_URL!,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "apollo-require-preflight": true,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const uploadedImage = res?.data?.data?.imageUploader;

    if (!uploadedImage) {
      throw new Error("Image upload failed: No url returned!");
    }
    return uploadedImage;
  } catch (error: any) {
    throw error;
  }
};
