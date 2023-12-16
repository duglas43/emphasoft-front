import React, { FC } from "react";
import { useGetUsersQuery } from "@src/store/api/api";
import {
  DataGrid,
  DataGridProps,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { UsersTableColumns } from ".";
import { useAppDispatch, useAppSelector } from "@src/hooks";
import { TextField, Box } from "@mui/material";
import {
  selectUsersTableSelectedIds,
  setSelectedIds,
} from "@src/store/slices/usersTable";

export interface UsersTableProps extends Partial<DataGridProps> {}

export const UsersTable: FC<UsersTableProps> = (props) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetUsersQuery(undefined);
  const [query, setQuery] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    return data.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
  }, [data, query]);
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const rowSelectionModel = useAppSelector(selectUsersTableSelectedIds);
  const handleRowSelectionModelChange = (
    newSelectionModel: GridRowSelectionModel
  ) => {
    if (Array.isArray(newSelectionModel)) {
      const newSelectionModelIds = newSelectionModel.map((id) => Number(id));
      dispatch(setSelectedIds(newSelectionModelIds));
    } else {
      dispatch(setSelectedIds([Number(newSelectionModel)]));
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Search"
        fullWidth
        size="small"
        value={query}
        onChange={handleQueryChange}
        sx={{ mb: 1 }}
      />
      <Box sx={{ height: "calc(100% - 48px)" }}>
        <DataGrid
          columns={UsersTableColumns}
          rows={filteredData}
          rowCount={data?.length || 0}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          hideFooter
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={rowSelectionModel}
          {...props}
          loading={isLoading || props.loading}
        />
      </Box>
    </>
  );
};
