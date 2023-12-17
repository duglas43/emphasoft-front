import { isRejectedWithValue } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const errorThunkMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (!isRejectedWithValue(action)) return next(action);
    const { data: errors } = action.payload.response;
    Object.keys(errors).forEach((key) => {
      const message = errors[key];
      if (typeof message === "string") {
        enqueueSnackbar({ message, variant: "error" });
      }
      if (Array.isArray(message)) {
        message.forEach((msg) => {
          enqueueSnackbar({ message: msg, variant: "error" });
        });
      }
    });
    return next(action);
  };
