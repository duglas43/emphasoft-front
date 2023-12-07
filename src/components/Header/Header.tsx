import { FC } from "react";
import { AppBar, Toolbar, AppBarProps, Box } from "@mui/material";
import { IconButton, Typography } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";

export interface HeaderProps extends AppBarProps {
  onDrawerToggle: () => void;
  text: string;
}
export const Header: FC<HeaderProps> = ({
  onDrawerToggle,
  text,
  ...appBarProps
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        ...appBarProps?.sx,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      {...appBarProps}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              onDrawerToggle();
            }}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {text}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
