"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Button,
  Menu,
  MenuItem,
  Typography,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { NoticeStatus } from "@/libs/enums/notice.enum";
import { useAdminNotices } from "@/libs/hooks/useAdminNotices";
import { useRouter, useSearchParams } from "next/navigation";
import { Notice } from "@/libs/types/notice/notice";
import Emty from "@/components/ui/Emty";
import { useMutation } from "@apollo/client";
import { UPDATE_NOTICE_BY_ADMIN } from "@/apollo/admin/mutation";
import { sweetConfirmAlert, sweetErrorAlert } from "@/libs/sweetAlert";

export const ADMIN_NOTICE_HEADCELLS = [
  "Title",
  "Category",
  "Priority",
  "Visibility",
  "Status",
  "Created",
  "Updated",
  "Actions",
];

export default function AdminNoticesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>([]);
  const { adminNotices, refetchAdminNotices } = useAdminNotices({
    searchParams,
  });

  //  ************************ APOLLO  ************************
  const [updateNotice] = useMutation(UPDATE_NOTICE_BY_ADMIN);
  const onStatusClick = (e: any, index: number) => {
    const temp = anchorEl.slice();
    temp[index] = e.currentTarget;
    setAnchorEl(temp);
  };

  const onStatusClose = (index: number) => {
    const temp = anchorEl.slice();
    temp[index] = null;
    setAnchorEl(temp);
  };

  const onEdit = async (id: string, status: string) => {
    if (status !== NoticeStatus.ACTIVE) {
      await sweetErrorAlert("Status should be (ACTIVE) to edit");
      return;
    }
    const params = new URLSearchParams();
    params.set("noticeId", id);
    router.push(`/admin/notice-create?${params.toString()}`);
  };

  const onStatusChange = async (id: string, status: string) => {
    if (!id || !status) return;
    try {
      if (
        await sweetConfirmAlert(`Are you sure to change into ${status} status`)
      ) {
        await updateNotice({
          variables: {
            input: {
              _id: id,
              noticeStatus: status,
            },
          },
        });
        await refetchAdminNotices();
      }
    } catch (error) {
      console.log("Error in onStatusChange: ", error);
    }
  };

  return (
    <Paper className="p-4 rounded-2xl shadow-none">
      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          {/* Header */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#16a34a",
              }}
            >
              {ADMIN_NOTICE_HEADCELLS.map((head) => (
                <TableCell
                  key={head}
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    borderBottom: "none",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Body */}
          <TableBody>
            {!adminNotices.length ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Emty title="No Notices" />
                </TableCell>
              </TableRow>
            ) : (
              adminNotices.map((notice: Notice, index: number) => (
                <TableRow hover key={notice._id}>
                  {/* Title */}
                  <TableCell sx={{ minWidth: 250 }}>
                    <Stack>
                      <Typography
                        fontWeight={600}
                        sx={{ maxWidth: 250 }}
                        className="line-clamp-1"
                      >
                        {notice.noticeTitle}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{
                          color: "#6b7280",
                          maxWidth: 250,
                        }}
                        className="line-clamp-1"
                      >
                        {notice.noticeContent}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Category */}
                  <TableCell align="center">
                    <Chip
                      label={notice.noticeCategory}
                      sx={{
                        backgroundColor: "#eff6ff",
                        color: "#1d4ed8",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* Priority */}
                  <TableCell align="center">
                    <Chip
                      label={notice.noticePriority}
                      sx={{
                        backgroundColor: "#fef3c7",
                        color: "#b45309",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* Visibility */}
                  <TableCell align="center">
                    <Chip
                      label={notice.noticeVisibility}
                      sx={{
                        backgroundColor: "#ecfdf5",
                        color: "#047857",
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  {/* Status */}
                  <TableCell align="center">
                    <Button
                      size="small"
                      onClick={(e) => onStatusClick(e, index)}
                      endIcon={<span className="text-xs">▼</span>}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "999px",
                        px: 2,

                        ...(notice.noticeStatus === NoticeStatus.ACTIVE && {
                          backgroundColor: "#ecfdf5",
                          color: "#047857",
                          border: "1px solid #a7f3d0",
                        }),

                        ...(notice.noticeStatus === NoticeStatus.HOLD && {
                          backgroundColor: "#fff7ed",
                          color: "#c2410c",
                          border: "1px solid #fed7aa",
                        }),

                        ...(notice.noticeStatus === NoticeStatus.DELETE && {
                          backgroundColor: "#fef2f2",
                          color: "#dc2626",
                          border: "1px solid #fecaca",
                        }),
                      }}
                    >
                      {notice.noticeStatus}
                    </Button>

                    <Menu
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => onStatusClose(index)}
                    >
                      {Object.values(NoticeStatus)
                        .filter((status) => status !== notice.noticeStatus)
                        .map((status) => (
                          <MenuItem
                            key={status}
                            onClick={() => {
                              onStatusClose(index);
                              onStatusChange(notice._id, status);
                            }}
                          >
                            {status}
                          </MenuItem>
                        ))}
                    </Menu>
                  </TableCell>

                  {/* Created */}
                  <TableCell align="center">
                    <Typography fontSize={13}>
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </Typography>

                    <Typography
                      fontSize={11}
                      sx={{ color: "#9ca3af" }}
                      className="line-clamp-1"
                    >
                      {new Date(notice.createdAt).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  {/* Updated */}
                  <TableCell align="center">
                    <Typography fontSize={13}>
                      {new Date(notice.updatedAt).toLocaleDateString()}
                    </Typography>

                    <Typography
                      fontSize={11}
                      sx={{ color: "#9ca3af" }}
                      className="line-clamp-1"
                    >
                      {new Date(notice.updatedAt).toLocaleTimeString()}
                    </Typography>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {/* Edit */}
                      <IconButton
                        size="small"
                        onClick={() => onEdit(notice._id, notice.noticeStatus)}
                        sx={{
                          backgroundColor: "#eff6ff",
                          border: "1px solid #bfdbfe",
                          color: "#2563eb",
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      {/* Preview */}
                      <IconButton
                        size="small"
                        onClick={() => router.push("/CS")}
                        sx={{
                          backgroundColor: "#f0fdf4",
                          border: "1px solid #bbf7d0",
                          color: "#16a34a",
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
