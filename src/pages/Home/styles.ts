import { SxProps, Theme } from "@mui/material";
export const temporaryDrawerSx: SxProps<Theme> = (theme) => ({
  display: { xs: "block", md: "none" },
  "& .MuiDrawer-paper": {
    width: theme.drawerWidth,
  },
});
export const permanentDrawerSx: SxProps<Theme> = (theme) => ({
  display: { xs: "none", md: "block" },
  width: theme.drawerWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: { width: theme.drawerWidth },
});
export const mainSx: SxProps<Theme> = (theme) => ({
  flexGrow: 1,
  overflowX: "clip",
  p: 2,
});
