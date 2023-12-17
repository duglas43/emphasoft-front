import React, { FC } from "react";
import { CreateUserForm } from "../CreateUserForm/CreateUserForm";
import { Typography, Box, BoxProps } from "@mui/material";
import { useCreateUserMutation } from "@src/store/api/api";
import { CreateUser } from "@src/@types";

export interface CreateUserContainerProps extends BoxProps {}
export const CreateUserContainer: FC<CreateUserContainerProps> = ({
  ...boxProps
}) => {
  const [createUser] = useCreateUserMutation();
  const handleSubmit = (values: CreateUser) => createUser(values).unwrap();
  return (
    <Box {...boxProps}>
      <Typography variant="h6" component="h1">
        Create User
      </Typography>
      <CreateUserForm onSubmit={handleSubmit} />
    </Box>
  );
};
