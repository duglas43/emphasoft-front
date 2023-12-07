import {
  UsersTable,
  CreateUserContainer,
  UpdateUserContainer,
} from "@src/components";
import { Box, Grid, Stack } from "@mui/material";
import { pageContainerSx, containerSx, pageItemSx } from "@src/styles/global";

export const HomePage = () => {
  return (
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
  );
};
