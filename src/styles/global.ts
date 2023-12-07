import { SxProps, Theme } from "@mui/system";

export const centerContainerSx: SxProps<Theme> = () => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: 2,
});
export const pageContainerSx: SxProps<Theme> = (theme: Theme) => ({
  height: {
    xs: "unset",
    md: "calc(100% - 65px)",
  },
  pb: {
    xs: 2,
    md: 0,
  },
});
export const pageItemSx: SxProps<Theme> = (theme: Theme) => ({
  height: {
    xs: "calc(100vh - 100px)",
    md: "100%",
  },
});
export const containerSx = {
  p: 2,
  borderRadius: 2,
  backgroundColor: "white",
  overflow: "hidden",
  height: "100%",
};
export const tableContainerSx: SxProps<Theme> = (theme: any) => ({
  height: "100%",
  width: {
    xs: "calc(100vw - 60px)",
    md: `calc(100vw - 60px - ${theme.drawerWidth}px)`,
  },
});
