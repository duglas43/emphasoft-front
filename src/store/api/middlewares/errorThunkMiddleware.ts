import { isRejectedWithValue } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const errorThunkMiddleware =
  (store: any) => (next: any) => (action: any) => {
    return next(action);
  };
