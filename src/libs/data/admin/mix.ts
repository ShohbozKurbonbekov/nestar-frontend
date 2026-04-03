export const ADMIN_PROPERTIES_HEADCELLS = [
  "TITLE",
  "PRICE",
  "AGENT",
  "LOCATION",
  "TYPE",
  "STATUS",
  "ACTIONS",
];

export const AdminCreateNoticeStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "#fff",
    transition: "all .2s ease",
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover fieldset": {
      borderColor: "#94a3b8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#475569",
      borderWidth: "1.5px",
    },
  },
};
