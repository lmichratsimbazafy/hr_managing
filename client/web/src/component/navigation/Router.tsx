import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../loader/Loader";
const SignIn = React.lazy(() => import("../SignIn/SignIn"));
const Layout = React.lazy(() => import("../layout/Layout"));

const Router = () => {
  return (
    <Suspense {...{ fallback: <Loader /> }}>
      <Routes>
        <Route {...{ path: "/login", element: <SignIn /> }} />
        <Route {...{ path: "*", element: <Layout /> }} />
      </Routes>
    </Suspense>
  );
};

export default Router;
