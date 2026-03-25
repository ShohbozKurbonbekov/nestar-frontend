import { useRef } from "react";
import { Button, Stack } from "@mui/material";
import { BoardArticleCategory } from "@/libs/enums/board-article.enum";
import { Editor } from "@toast-ui/react-editor";
import { getJwtToken } from "@/libs/auth";
import axios from "axios";
import "@toast-ui/editor/dist/toastui-editor.css";
import { RHFSelect } from "@/app/[locale]/profile/_components/property/RHFSelect";
import { RHFInput } from "@/app/[locale]/profile/_components/property/RHFInput";
import { useFormContext } from "react-hook-form";
import { sweetMixinErrorAlert } from "@/libs/sweetAlert";
import { serverApi } from "@/libs/config";

interface TEditorType {
  articleId: string | null;
  onSubmit: (values: any) => Promise<void>;
  onUpdate: (value: any) => Promise<void>;
}
const TuiEditor = ({ articleId, onSubmit, onUpdate }: TEditorType) => {
  const editorRef = useRef<Editor | null>(null),
    token = getJwtToken();
  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useFormContext();
  /** HANDLERS **/
  const uploadImage = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append(
        "operations",
        JSON.stringify({
          query: `mutation ImageUploader($file: Upload!, $target: String!) { 
      imageUploader(file: $file, target: $target)
    }`,
          variables: {
            file: null,
            target: "article",
          },
        }),
      );

      formData.append(
        "map",
        JSON.stringify({
          "0": ["variables.file"],
        }),
      );

      formData.append("0", image);
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

      const responseImage = res.data.data.imageUploader;

      setValue("articleImage", responseImage);
      return `${serverApi}/${responseImage}`;
    } catch (error: any) {
      console.log("Error in uploading article image: ", error);
      await sweetMixinErrorAlert(error.message);
    }
  };

  return (
    <Stack gap={"12px"} paddingY={"1.7rem"}>
      <div className="flex flex-row items-center gap-5">
        <RHFSelect
          name="articleCategory"
          label="Article Category"
          options={Object.keys(BoardArticleCategory)}
        />
        <RHFInput name="articleTitle" label="Article Title" />
      </div>

      <Editor
        initialValue={"Type here"}
        placeholder={"Type here"}
        previewStyle={"vertical"}
        height={"640px"}
        // @ts-ignore
        initialEditType={"WYSIWYG"}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        ref={editorRef}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            const uploadedImageURL = await uploadImage(image);
            callback(uploadedImageURL);
            return false;
          },
        }}
        onChange={() => {
          const content = editorRef?.current?.getInstance().getHTML();
          setValue("articleContent", content);
        }}
      />

      <Button
        className="self-end"
        variant="contained"
        color="success"
        onClick={handleSubmit(articleId ? onUpdate : onSubmit)}
        disabled={isSubmitting}
      >
        {articleId ? "Save" : "Submit"}
      </Button>
    </Stack>
  );
};

export default TuiEditor;
