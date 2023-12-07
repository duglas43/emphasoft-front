import React, { FC } from "react";
import { useFormik } from "formik";
import { SignIn } from "@src/@types";
import * as yup from "yup";
import { TextField, Button, Box } from "@mui/material";
import { signInFormSx } from "./styles";

export interface SignInFormProps {
  onSubmit: (values: SignIn) => void;
}

export const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  const initialValues: SignIn = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  return (
    <Box component="form" sx={signInFormSx} onSubmit={formik.handleSubmit}>
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
      <Button fullWidth type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};
