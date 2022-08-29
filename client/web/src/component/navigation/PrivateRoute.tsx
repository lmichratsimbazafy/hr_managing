import React from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthServices } from "../../services/authservice";

const PrivateRoute = () => {
  const location = useLocation();
  return AuthServices.isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate {...{ to: "login", state: { from: location }, replace: true }} />
  );
};

export default PrivateRoute;
