
import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../components/layout";
import PrivateRoute from "./privateRoute";

const Login = lazy(() => import("../views/login"));

const Wellcome = lazy(() => import("../views/wellcome"));

const NotFound = lazy(() => import("../views/noFound"));

const Router = [
  {
    id: "login",
    path: "/",
    element: <Login />,
  },

    {
      id: "wellcome",
      path: "/wellcome",
      element: (
        <PrivateRoute element={<Layout><Wellcome /></Layout>} />
      ),
    },
  //   {
  //     id: "list-products",
  //     path: "/list-products",
  //     element: (
  //       <PrivateRoute allowedRoles={["admin"]} element={<Layout><ListEmployees /></Layout>} />
  //     ),
  //   },
  //   {
  //     id: "detail-employee",
  //     path: "/detail-employee/:id",
  //     element: (
  //       <PrivateRoute allowedRoles={["admin"]} element={<Layout><DetailEmployee /></Layout>} />
  //     ),
  //   },

  {
    id: "notFound",
    path: "*",
    element: <NotFound />,
  },
];

export default createBrowserRouter(Router);
