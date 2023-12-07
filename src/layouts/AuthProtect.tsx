import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
export const AuthProtect: FC = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};
