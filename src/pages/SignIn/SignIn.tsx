import React, { FC } from "react";
import { SignInForm } from "@src/components/SignInForm";
import { useSignInMutation } from "@src/store/api/api";
import { SignIn } from "@src/@types";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { signInCardSx } from "./styles";
import { centerContainerSx } from "@src/styles/global";

export const SignInPage: FC = () => {
  const [signIn] = useSignInMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: SignIn) => {
    const { token } = await signIn(values).unwrap();
    localStorage.setItem("token", token);
    localStorage.setItem("username", values.username);
    navigate("/");
  };
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box sx={centerContainerSx}>
      <Box sx={signInCardSx}>
        <Typography
          variant="h6"
          component="h1"
          sx={{ textAlign: "center", mb: 1 }}
        >
          Sign In
        </Typography>
        <SignInForm onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};
