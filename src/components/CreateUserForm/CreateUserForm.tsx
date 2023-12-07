import React, { FC } from "react";
import { useFormik } from "formik";
import { CreateUser } from "@src/@types";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { createUserFormSx } from "./styles";

export interface CreateUserFormProps {
  onSubmit: (values: CreateUser) => void;
}

export const CreateUserForm: FC<CreateUserFormProps> = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(
        /^[\w.@+-]+$/,
        "Username can only contain alphanumeric characters or . @ + - _"
      )
      .max(150, "Username cannot be longer than 150 characters"),
    first_name: yup
      .string()
      .max(150, "First name cannot be longer than 150 characters"),
    last_name: yup
      .string()
      .max(150, "Last name cannot be longer than 150 characters"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least 8 characters, 1 uppercase letter and 1 number"
      )
      .max(128, "Password cannot be longer than 128 characters"),
    is_active: yup.boolean(),
  });
  const initialValues: CreateUser = {
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    is_active: true,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
    },
  });
  return (
    <Box component="form" sx={createUserFormSx} onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username"
        type="text"
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
        error={formik.touched.username && !!formik.errors.username}
        helperText={
          formik.touched.username &&
          formik.errors.username &&
          formik.errors.username
        }
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={!!formik.touched.password && !!formik.errors.password}
        helperText={
          formik.touched.password &&
          formik.errors.password &&
          formik.errors.password
        }
      />

      <TextField
        fullWidth
        id="first_name"
        name="first_name"
        label="First name"
        type="text"
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.first_name}
        error={formik.touched.first_name && !!formik.errors.first_name}
        helperText={
          formik.touched.first_name &&
          formik.errors.first_name &&
          formik.errors.first_name
        }
      />

      <TextField
        fullWidth
        id="last_name"
        name="last_name"
        label="Last name"
        type="text"
        size="small"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.last_name}
        error={formik.touched.last_name && !!formik.errors.last_name}
        helperText={
          formik.touched.last_name &&
          formik.errors.last_name &&
          formik.errors.last_name
        }
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.is_active}
            onChange={formik.handleChange}
            name="is_active"
            color="primary"
          />
        }
        label="Active"
      />

      <Button fullWidth type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};
