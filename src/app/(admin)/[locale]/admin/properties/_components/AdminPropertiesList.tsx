import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  Button,
  Menu,
  MenuItem,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { useAdminProperties } from "@/libs/hooks/useAdminProperties";
import { useSearchParams } from "next/navigation";
import { ADMIN_PROPERTIES_HEADCELLS } from "@/libs/data/admin/mix";
import Emty from "@/components/ui/Emty";
import { Property } from "@/libs/types/property/property";
import { serverApi } from "@/libs/config";
import { priceFormatter } from "@/libs/utils/priceFormatter";
import { PropertyStatus } from "@/libs/enums/property.enum";
import { useMutation } from "@apollo/client";
import { UPDATE_PROPERTY_BY_ADMIN } from "@/apollo/admin/mutation";
import { sweetConfirmAlert, sweetErrorHandling } from "@/libs/sweetAlert";
import { useRouter } from "next/navigation";

export default function AdminPropertiesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { adminProperties, refetchAdminProperties } = useAdminProperties({
    searchParams,
  });
  const [anchorEl, setAnchorEl] = useState<(null | HTMLElement)[]>([]);

  // **********************************  Apollo **********************************
  const [updateStatus] = useMutation(UPDATE_PROPERTY_BY_ADMIN);

  const onStatus = async (id: string, status: PropertyStatus) => {
    console.log("ID & STATUS: ", id, status);
    try {
      if (
        await sweetConfirmAlert(`Are you sure to change into ${status} status`)
      ) {
        await updateStatus({
          variables: {
            input: {
              _id: id,
              propertyStatus: status,
            },
          },
        });
        await refetchAdminProperties();
      }
    } catch (error: any) {
      console.log("Error in onStatus: ", error.message);
      await sweetErrorHandling(error);
    }
  };

  const onPushDetail = (id: string) => {
    if (!id) return;

    router.push(`/properties/${id}`);
  };

  const onStatusIconClick = (e: any, index: number) => {
    const tempAnchor = anchorEl.slice();
    tempAnchor[index] = e.currentTarget;
    setAnchorEl(tempAnchor);
  };

  const onStatusIconClose = (index: number) => {
    const tempAnchor = anchorEl.slice();
    tempAnchor[index] = null;
    setAnchorEl(tempAnchor);
  };

  return (
    <Paper className="p-4 rounded-2xl shadow-none">
      <Stack>
        <TableContainer>
          <Table sx={{ minWidth: 900, tableLayout: "auto" }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#16a34a",
                }}
              >
                {ADMIN_PROPERTIES_HEADCELLS.map((head) => (
                  <TableCell
                    key={head}
                    align="center"
                    sx={{
                      color: "white",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                      borderBottom: "none",
                      py: 2,
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
              {!adminProperties.length ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Emty title="No Properties" />
                  </TableCell>
                </TableRow>
              ) : (
                adminProperties.map((property: Property, index: number) => {
                  const imageUrl = property.propertyImages[0]
                    ? `${serverApi}/${property.propertyImages[0]}`
                    : "/images/default-property.png";
                  return (
                    <TableRow hover key={property._id}>
                      <TableCell sx={{ minWidth: 280 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            src={imageUrl}
                            variant="rounded"
                            sx={{ width: 48, height: 48 }}
                          />
                          <Typography fontWeight={500}>
                            {property.propertyTitle}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 120,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {priceFormatter(property.propertyPrice)}
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 160,
                          whiteSpace: "nowrap",
                          textWrap: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        @{property?.memberData?.memberNick}
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          label={property.propertyLocation}
                          size="medium"
                          sx={{
                            fontWeight: 600,
                            px: 1,
                            backgroundColor: "#ecfdf5",
                            color: "#047857",
                            border: "1px solid #a7f3d0",
                            borderRadius: "14px",
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        <Chip
                          label={property.propertyType}
                          size="medium"
                          sx={{
                            fontWeight: 600,
                            px: 1,
                            backgroundColor: "#eff6ff",
                            color: "#1d4ed8",
                            border: "1px solid #bfdbfe",
                            borderRadius: "8px",
                          }}
                        />
                      </TableCell>

                      {/* Status */}
                      <TableCell align="center" sx={{ minWidth: 160 }}>
                        {property.propertyStatus === PropertyStatus.DELETE && (
                          <Chip
                            size="medium"
                            sx={{
                              fontWeight: 600,
                              backgroundColor: "#fef2f2",
                              color: "#dc2626",
                              border: "1px solid #fecaca",
                              px: 1,
                            }}
                            label={PropertyStatus.DELETE}
                          />
                        )}

                        {property.propertyStatus === PropertyStatus.SOLD && (
                          <Chip
                            label="SOLD"
                            size="medium"
                            sx={{
                              fontWeight: 700,
                              backgroundColor: "#fff7ed",
                              color: "#c2410c",
                              border: "1px solid #fed7aa",
                              px: 1,
                            }}
                          />
                        )}

                        {property.propertyStatus === PropertyStatus.ACTIVE && (
                          <>
                            <Button
                              size="small"
                              onClick={(e) => onStatusIconClick(e, index)}
                              endIcon={
                                <span
                                  style={{ fontSize: 10 }}
                                  className="mx-px"
                                >
                                  ▼
                                </span>
                              }
                              sx={{
                                textTransform: "none",
                                fontWeight: 700,
                                borderRadius: "999px",
                                px: 2,
                                py: 0.5,
                                backgroundColor: "#ecfdf5",
                                color: "#047857",
                                border: "1px solid #a7f3d0",
                                "&:hover": {
                                  backgroundColor: "#d1fae5",
                                },
                              }}
                            >
                              <span
                                style={{
                                  margin: "0 4px 0 4px",
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  backgroundColor: "#10b981",
                                }}
                              />
                              ACTIVE
                            </Button>

                            <Menu
                              anchorEl={anchorEl[index]}
                              open={Boolean(anchorEl[index])}
                              onClose={() => onStatusIconClose(index)}
                              PaperProps={{
                                sx: {
                                  mt: 1,
                                  borderRadius: 2,
                                  boxShadow: "0 2px 3px rgba(0,0,0,0.08)",
                                  border: "1px solid #e5e7eb",
                                },
                              }}
                            >
                              {Object.values(PropertyStatus)
                                .filter(
                                  (status) =>
                                    status !== property.propertyStatus,
                                )
                                .map((status) => (
                                  <MenuItem
                                    key={status}
                                    onClick={() => {
                                      onStatus(property._id, status);
                                      onStatusIconClose(index);
                                    }}
                                  >
                                    {status}
                                  </MenuItem>
                                ))}
                            </Menu>
                          </>
                        )}
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 90,
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => onPushDetail(property._id)}
                          sx={{
                            backgroundColor: "#f0fdf4",
                            border: "1px solid #bbf7d0",
                            marginRight: "10px",
                            "&:hover": {
                              backgroundColor: "#dcfce7",
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Paper>
  );
}
