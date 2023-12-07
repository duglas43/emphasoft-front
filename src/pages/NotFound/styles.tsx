import { SxProps, Theme } from "@mui/material";
export const notFoundContainerSx: SxProps<Theme> = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100vh - 88px)",
});
