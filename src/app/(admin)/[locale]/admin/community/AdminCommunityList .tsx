"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  Typography,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminCommunity } from "@/libs/hooks/useAdminCommunity";
import { BoardArticle } from "@/libs/types/board-article/board-article";
import Emty from "@/components/ui/Emty";
import { serverApi } from "@/libs/config";
import { BoardArticleStatus } from "@/libs/enums/board-article.enum";
import { useMutation } from "@apollo/client";
import { REMOVE_BOARD_ARTICLE_BY_ADMIN } from "@/apollo/admin/mutation";
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert";

const HEADERS = [
  "Article",
  "Author",
  "Category",
  "Views",
  "Likes",
  "Comments",
  "Status",
  "Actions",
];
export default function AdminArticlesTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { adminCommunityList, refetchAdminCommunity } = useAdminCommunity({
    searchParams,
  });

  // **********************************  Apollo **********************************
  const [deleteArticle] = useMutation(REMOVE_BOARD_ARTICLE_BY_ADMIN);

  const onDelete = async (id: string) => {
    try {
      if (await sweetConfirmAlert(`Are you sure to delete`)) {
        await deleteArticle({
          variables: {
            input: id,
          },
        });
        await refetchAdminCommunity();
      }
    } catch (error: any) {
      console.log("Error in onStatus: ", error.message);
      await sweetErrorHandling(error);
    }
  };

  const onPushDetail = (id: string) => {
    if (!id) return;

    router.push(`/community/${id}`);
  };
  return (
    <Paper className="p-4 rounded-2xl shadow-none">
      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#16a34a",
              }}
            >
              {HEADERS.map((head) => (
                <TableCell
                  key={head}
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    borderBottom: "none",
                  }}
                >
                  <Typography fontWeight={700} fontSize={13}>
                    {head}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {!adminCommunityList.length ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Emty title="No Articles" />
                </TableCell>
              </TableRow>
            ) : (
              adminCommunityList.map((article: BoardArticle) => {
                const imageIUrl = article.articleImage
                  ? `${serverApi}/${article.articleImage}`
                  : "/images/default-blog.png";
                return (
                  <TableRow hover key={article._id}>
                    {/* Article */}
                    <TableCell sx={{ minWidth: 280 }}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={imageIUrl}
                          variant="rounded"
                          sx={{ width: 48, height: 48 }}
                        />
                        <Stack>
                          <Typography variant="h6" className="line-clamp-1">
                            {article.articleTitle}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-slate-500 line-clamp-1"
                          >
                            {new Date(article.createdAt).toLocaleDateString()}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    {/* Author */}
                    <TableCell align="center">
                      <Typography fontWeight={600} fontSize={13}>
                        @{article?.memberData?.memberNick || "Uknown"}
                      </Typography>
                    </TableCell>

                    {/* Category */}
                    <TableCell align="center">
                      <Chip
                        label={article.articleCategory}
                        sx={{
                          fontWeight: 600,
                          backgroundColor: "#eff6ff",
                          color: "#1d4ed8",
                          border: "1px solid #bfdbfe",
                        }}
                      />
                    </TableCell>

                    {/* Views */}
                    <TableCell align="center">{article.articleViews}</TableCell>

                    {/* Likes */}
                    <TableCell align="center">{article.articleLikes}</TableCell>

                    {/* Comments */}
                    <TableCell align="center">
                      {article.articleComments}
                    </TableCell>

                    {/* Status */}
                    <TableCell align="center">
                      {article.articleStatus === "DELETE" && (
                        <Chip
                          label="DELETE"
                          sx={{
                            backgroundColor: "#fef2f2",
                            color: "#dc2626",
                            border: "1px solid #fecaca",
                            fontWeight: 600,
                          }}
                        />
                      )}

                      {article.articleStatus === "ACTIVE" && (
                        <Chip
                          label="ACTIVE"
                          sx={{
                            backgroundColor: "#ecfdf5",
                            color: "#047857",
                            border: "1px solid #a7f3d0",
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        {/* View */}
                        <IconButton
                          size="small"
                          disabled={
                            article.articleStatus === BoardArticleStatus.DELETE
                          }
                          onClick={() => onPushDetail(article._id)}
                          sx={{
                            backgroundColor:
                              article.articleStatus ===
                              BoardArticleStatus.DELETE
                                ? "#f9fafb"
                                : "#f0fdf4",
                            border:
                              article.articleStatus ===
                              BoardArticleStatus.DELETE
                                ? "1px solid #e5e7eb"
                                : "1px solid #bbf7d0",
                            color:
                              article.articleStatus ===
                              BoardArticleStatus.DELETE
                                ? "#9ca3af"
                                : "#16a34a",
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>

                        {/* Delete */}
                        <IconButton
                          size="small"
                          disabled={
                            article.articleStatus === BoardArticleStatus.DELETE
                          }
                          sx={{
                            backgroundColor:
                              article.articleStatus ===
                              BoardArticleStatus.DELETE
                                ? "#f9fafb"
                                : "#fef2f2",
                            border:
                              article.articleStatus ===
                              BoardArticleStatus.DELETE
                                ? "1px solid #e5e7eb"
                                : "1px solid #fecaca",
                            color:
                              article.articleStatus ===
                              BoardArticleStatus.DELETE
                                ? "#9ca3af"
                                : "#dc2626",
                          }}
                          onClick={() => onDelete(article._id)}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
