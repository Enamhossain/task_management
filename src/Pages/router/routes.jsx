import * as React from "react";

import { createBrowserRouter } from "react-router-dom";

import Home from "../Home/Home/Home";
import Layout from "../../Layout/Layout";
import Singin from "../Singin/Singin";
import Singup from "../Singup/Singup";
import Features from "../Features/Features";

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
]);

export default router;
