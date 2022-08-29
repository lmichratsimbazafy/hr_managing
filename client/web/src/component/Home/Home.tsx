import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
// import ConsultantsList from "../consultantsList/ConsultantsList";
import Loader from "../loader/Loader";
import StatusList from "../statusList/StatusList";

const ConsultantDetails = React.lazy(
  () => import("../consultantDetails/ConsultantDetails")
);
const ConsultantsList = React.lazy(
  () => import("../consultantsList/ConsultantsList")
);

const Home = () => {
  return (
    <div>
      {/* <ConsultantsList /> */}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <StatusList />
        <Suspense {...{ fallback: <Loader /> }}>
          <Routes>
            <Route {...{ path: "/consultants", element: <ConsultantsList /> }}>
              <Route {...{ path: ":id", element: <ConsultantDetails /> }} />
            </Route>
          </Routes>
        </Suspense>
      </Box>
      <Outlet />
    </div>
  );
};

export default Home;
