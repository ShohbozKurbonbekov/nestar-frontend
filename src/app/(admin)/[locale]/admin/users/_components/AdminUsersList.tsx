import { serverApi } from "@/libs/config";
import { useAdminUsers } from "@/libs/hooks/useAdminUsers";
import { Member } from "@/libs/types/member/member";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { TypeChipFinder } from "./TypeChipFinder";
import { StatusChipFinder } from "./StatusChipFinder";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { MemberStatus } from "@/libs/enums/member.enum";
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { UPDATE_MEMBER_BY_ADMIN } from "@/apollo/admin/mutation";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Emty from "@/components/ui/Emty";

export default function AdminUsersList() {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const searchParams = useSearchParams();
  const { adminUsers, refetchAdminUsers } = useAdminUsers({ searchParams });
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (e: any) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const [updatedMember, setUpdatedMember] = useState<Member | null>(null);

  //************************  Apollo   *************************/
  const [updateMember] = useMutation(UPDATE_MEMBER_BY_ADMIN);

  // -------------- Hanlders ----------------

  const onUpdateStatus = async (id: string, status: MemberStatus) => {
    if (!id) return;

    try {
      if (
        await sweetConfirmAlert(`Are you sure to change into ${status} status?`)
      ) {
        await updateMember({
          variables: {
            input: {
              _id: id,
              memberStatus: status,
            },
          },
        });
      }
      await refetchAdminUsers();
    } catch (error: any) {
      console.log("Error in onDelete: ", error);
      await sweetErrorHandling(error);
    } finally {
      setUpdatedMember(null);
    }
  };

  const onDelete = async (id: string) => {
    try {
      if (await sweetConfirmAlert("Are you sure to delete this user?")) {
        await updateMember({
          variables: {
            input: {
              _id: id,
              memberStatus: MemberStatus.DELETE,
            },
          },
        });
      }
      await refetchAdminUsers();
    } catch (error) {
      console.log("Error in onDelete: ", error);
      await sweetErrorHandling(error);
    }
  };

  const pushMemberDetail = (id: string) => {
    if (!id) return;

    if (id === user._id) {
      router.push(`/admin/profile`);
      return;
    }

    router.push(`/profile/${id}`);
  };

  return (
    <Box className="min-w-200">
      <TableContainer className="w-full">
        <Table className="">
          <TableHead className="bg-green-300">
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!adminUsers.length ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Emty title="No Users" />
                </TableCell>
              </TableRow>
            ) : (
              adminUsers.map((user: Member) => (
                <TableRow hover key={user._id}>
                  <TableCell>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      <Avatar
                        src={
                          user.memberImage
                            ? `${serverApi}/${user.memberImage}`
                            : "/images/user-default.png"
                        }
                      />
                      <Box>
                        <Typography className="font-medium text-slate-800 line-clamp-1">
                          {user.memberFullName || "Uknown"}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-slate-500 line-clamp-1"
                        >
                          @{user.memberNick || "Uknown"}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <TypeChipFinder type={user.memberType} />
                  </TableCell>
                  <TableCell>
                    <Typography className="text-slate-700 line-clamp-1">
                      {user.memberPhone}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-slate-700 line-clamp-1">
                      {user.memberAddress}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <StatusChipFinder
                      status={user.memberStatus}
                      onClick={(e: any) => {
                        openMenu(e);
                        setUpdatedMember(user);
                      }}
                    />
                  </TableCell>

                  {/* ACTIONS */}
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton
                        onClick={() => pushMemberDetail(user._id)}
                        sx={{
                          backgroundColor: "#e0f2fe",
                          "&:hover": { backgroundColor: "#bae6fd" },
                        }}
                      >
                        <VisibilityOutlinedIcon
                          fontSize="small"
                          sx={{ color: "#0284c7" }}
                        />
                      </IconButton>

                      <IconButton
                        onClick={() => onDelete(user._id)}
                        sx={{
                          backgroundColor: "#fee2e2",
                          "&:hover": { backgroundColor: "#fecaca" },
                        }}
                      >
                        <DeleteOutlineOutlinedIcon
                          fontSize="small"
                          sx={{ color: "#dc2626" }}
                        />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* STATUS DROPDOWN */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {Object.keys(MemberStatus).map((opt) => (
          <MenuItem
            key={opt}
            onClick={() => {
              closeMenu();
              updatedMember &&
                onUpdateStatus(updatedMember?._id, opt as MemberStatus);
            }}
          >
            {opt}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
