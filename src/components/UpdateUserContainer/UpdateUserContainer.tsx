import React, { FC } from "react";
import { Box, Typography, BoxProps } from "@mui/material";
import { UpdateUserForm, UpdateUserFormPlaceholder } from "../";
import { useUpdateUserMutation, useGetUserQuery } from "@src/store/api/api";
import { useAppSelector } from "@src/hooks";
import { selectUsersTableSelectedIds } from "@src/store/slices";
import { skipToken } from "@reduxjs/toolkit/query";
import { UpdateUser } from "@src/@types";

export interface UpdateUserContainerProps extends BoxProps {}
export const UpdateUserContainer: FC<UpdateUserContainerProps> = ({
  ...boxProps
}) => {
  const [updateUser] = useUpdateUserMutation();
  const selectedIds = useAppSelector(selectUsersTableSelectedIds);
  const { currentData: selectedUser } = useGetUserQuery(
    selectedIds[0] || skipToken
  );

  const handleSubmit = async (values: UpdateUser) => {
    if (!selectedIds[0]) return null;
    return updateUser({ id: selectedIds[0], data: values }).unwrap();
  };
  return (
    <Box {...boxProps}>
      <Typography variant="h6" component="h1">
        Update User
      </Typography>
      {selectedUser ? (
        <UpdateUserForm initialValues={selectedUser} onSubmit={handleSubmit} />
      ) : (
        <UpdateUserFormPlaceholder />
      )}
    </Box>
  );
};
