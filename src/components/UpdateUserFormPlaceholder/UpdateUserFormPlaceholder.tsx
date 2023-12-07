import { FC } from "react";

import {
  TextField,
  Button,
  Box,
  BoxProps,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { updateUserFormSx } from "../UpdateUserForm/styles";

export interface UpdateUserFormPlaceholderProps extends BoxProps {}

export const UpdateUserFormPlaceholder: FC<UpdateUserFormPlaceholderProps> = ({
  ...boxProps
}) => {
  return (
    <Box component="form" sx={updateUserFormSx} {...boxProps}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username"
        type="text"
        size="small"
        disabled
      />

      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        size="small"
        disabled
      />

      <TextField
        fullWidth
        id="first_name"
        name="first_name"
        label="First name"
        type="text"
        size="small"
        disabled
      />

      <TextField
        fullWidth
        id="last_name"
        name="last_name"
        label="Last name"
        type="text"
        size="small"
        disabled
      />

      <FormControlLabel
        control={<Checkbox id="is_active" name="is_active" size="small" />}
        label="Active"
        disabled
      />

      <Button fullWidth type="submit" variant="contained" disabled>
        Submit
      </Button>
    </Box>
  );
};
