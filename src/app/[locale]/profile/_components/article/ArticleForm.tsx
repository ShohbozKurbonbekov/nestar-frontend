import { BoardArticle } from "@/libs/types/board-article/board-article";
import { ArticleFormProvider } from "./ArticleFormProvider";
import dynamic from "next/dynamic";
import TuiEditor from "../../../../../components/ui/TEditor";
import { useSearchParams } from "next/navigation";

const TEditor = dynamic(() => import("../../../../../components/ui/TEditor"));

interface ArticleForm {
  articleData: BoardArticle;
  onSubmit: (values: any) => Promise<void>;
  onUpdate: (values: any) => Promise<void>;
}
export default function ArticleForm({
  articleData,
  onSubmit,
  onUpdate,
}: ArticleForm) {
  const searchParams = useSearchParams();
  const articleId = searchParams.get("articleId");

  return (
    <ArticleFormProvider articleData={articleData}>
      <div className="p-6">
        <TEditor
          articleId={articleId}
          onSubmit={onSubmit}
          onUpdate={onUpdate}
          articleData={articleData}
        />
      </div>
    </ArticleFormProvider>
  );
}
