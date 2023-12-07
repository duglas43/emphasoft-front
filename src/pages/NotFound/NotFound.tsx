import React, { FC } from "react";
import { notFoundContainerSx } from "./styles";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFoundPage: FC = () => {
  return (
    <Box sx={notFoundContainerSx}>
      <Typography variant="h3" component="h1" sx={{ display: "block" }}>
        Content you are looking for is not found
      </Typography>
      <Link to="/">Go to Home</Link>
    </Box>
  );
};
