import { serverApi } from "@/libs/config";
import { useAdminUsers } from "@/libs/hooks/useAdminUsers";
import { Member } from "@/libs/types/member/member";
import { X } from "@mui/icons-material";
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
import { useSearchParams } from "next/navigation";
import { TypeChipFinder } from "./TypeChipFinder";
import { StatusChipFinder } from "./StatusChipFinder";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MemberStatus } from "@/libs/enums/member.enum";

export default function AdminUsersList() {
  const searchParams = useSearchParams();
  const { adminUsers, query } = useAdminUsers({ searchParams });

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e: any) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const onStatus = (status: string) => {
    console.log(status);
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
            {adminUsers.map((user: Member) => (
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
                      <Typography variant="body2" className="text-slate-500">
                        @{user.memberNick || "Uknown"}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell>
                  <TypeChipFinder type={user.memberType} />
                </TableCell>
                <TableCell>
                  <Typography className="text-slate-700">
                    {user.memberPhone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-slate-700">
                    {user.memberAddress}
                  </Typography>
                </TableCell>
                <TableCell>
                  <StatusChipFinder
                    status={user.memberStatus}
                    onClick={openMenu}
                  />
                </TableCell>

                {/* ACTIONS */}
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton
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
                      sx={{
                        backgroundColor: "#e0e7ff",
                        "&:hover": { backgroundColor: "#c7d2fe" },
                      }}
                    >
                      <EditOutlinedIcon
                        fontSize="small"
                        sx={{ color: "#4f46e5" }}
                      />
                    </IconButton>

                    <IconButton
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* STATUS DROPDOWN */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {Object.keys(MemberStatus).map((opt) => (
          <MenuItem key={opt} onClick={() => onStatus(opt)}>
            {opt}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
