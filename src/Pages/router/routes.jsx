import * as React from "react";

import { createBrowserRouter } from "react-router-dom";

import Home from "../Home/Home/Home";
import Layout from "../../Layout/Layout";
import Singin from "../Singin/Singin";
import Singup from "../Singup/Singup";
import Features from "../Features/Features";
import DashboardLayout from "../../Layout/dashboardLayout";
import Dashboard from "../Dashboard/Dashboard";
import Tasks from "../Dashboard/Tasks";
import PrivateRoutes from "./PrivateRotues";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Features",
        element: <Features />,
      },

      {
        path: "SingIn",
        element: <Singin />,
      },
      {
        path: "Registertion",
        element: <Singup />,
      },
    ],
  },

  {
    path:"dashboard",
    element:<PrivateRoutes><DashboardLayout/></PrivateRoutes>,
    children:[
      {
        path:"dashboard",
        element:<Dashboard/>
      },
      {
        path:"Tasks",
        element:<Tasks/>
      }
    ]
  }
]);

export default router;
