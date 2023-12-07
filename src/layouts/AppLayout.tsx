import React, { FC } from "react";
import { Box, Drawer, Toolbar } from "@mui/material";
import { Header } from "@src/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "@src/components/Sidebar";
import { SIDEBAR_SCHEMA } from "@src/components/Sidebar";
import { temporaryDrawerSx, permanentDrawerSx, mainSx } from "./styles";

export interface AppLayoutProps {}
export const AppLayout: FC<AppLayoutProps> = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignSelf: "stretch", height: "100%" }}>
        <Header
          onDrawerToggle={() => {
            handleDrawerToggle();
          }}
          text={"Users"}
        />
        <Box
          component="nav"
          sx={{ flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={temporaryDrawerSx}
          >
            <Toolbar />
            <Sidebar schema={SIDEBAR_SCHEMA} />
          </Drawer>
          <Drawer variant="permanent" sx={permanentDrawerSx} open>
            <Toolbar />
            <Sidebar schema={SIDEBAR_SCHEMA} />
          </Drawer>
        </Box>
        <Box component="main" sx={mainSx}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
