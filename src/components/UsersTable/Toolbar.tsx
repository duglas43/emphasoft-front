import React, { FC } from "react";
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

export interface UsersTableToolbarProps {
  onAddClick: () => void;
  hideAddButton?: boolean;
}
export const UsersTableToolbar: FC<UsersTableToolbarProps> = React.memo(() => {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </Box>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
});
