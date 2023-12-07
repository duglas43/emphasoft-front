import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface UsersTableState {
  selectedIds: number[];
}

const initialState: UsersTableState = {
  selectedIds: [],
};

const usersTableSlice = createSlice({
  name: "usersTable",
  initialState,
  reducers: {
    setSelectedIds: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload;
    },
  },
});

export const { setSelectedIds } = usersTableSlice.actions;
export const usersTableReducer = usersTableSlice.reducer;
export const selectUsersTableSelectedIds = (state: RootState) =>
  state.usersTable.selectedIds;
