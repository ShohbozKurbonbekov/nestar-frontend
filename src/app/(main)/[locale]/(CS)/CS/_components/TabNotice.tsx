import { Paper, Stack } from "@mui/material";
import NoticeFilter from "./NoticeFilter";
import NoticeList from "./NoticeList";

export default function TabNotice() {
  return (
    <Stack gap={5}>
      <NoticeFilter />
      <NoticeList />
    </Stack>
  );
}
