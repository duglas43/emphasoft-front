import React, { FC } from "react";
import {
  UsersTable,
  CreateUserContainer,
  UpdateUserContainer,
  Header,
  Sidebar,
} from "@src/components";

import { SIDEBAR_SCHEMA } from "@src/components/Sidebar";
import { Box, Grid, Stack, Drawer, Toolbar } from "@mui/material";
import { pageContainerSx, containerSx, pageItemSx } from "@src/styles/global";
import { Navigate } from "react-router-dom";
import { temporaryDrawerSx, permanentDrawerSx, mainSx } from "./styles";

export const HomePage: FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  if (!localStorage.getItem("token")) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <Box sx={{ display: "flex", alignSelf: "stretch", height: "100%" }}>
        <Header
          onDrawerToggle={() => {
            handleDrawerToggle();
          }}
          title={"Users"}
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            window.location.reload();
          }}
          userName={localStorage.getItem("username") || ""}
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
          <Grid
            container
            rowSpacing={{ xs: 2, md: 0 }}
            columnSpacing={2}
            sx={pageContainerSx}
          >
            <Grid item xs={12} md={5} lg={7} sx={pageItemSx}>
              <Box sx={containerSx}>
                <UsersTable />
              </Box>
            </Grid>

            <Grid item xs={12} md={7} lg={5}>
              <Stack gap={2} mb={2}>
                <Box sx={{ ...containerSx, height: "unset", pt: 1 }}>
                  <CreateUserContainer />
                </Box>
                <Box sx={{ ...containerSx, height: "unset", pt: 1 }}>
                  <UpdateUserContainer />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
