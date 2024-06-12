// eslint-disable-next-line no-unused-vars
import React from "react";
import Home from "./Pages/Home/Home/Home";
import { RouterProvider } from "react-router-dom";
import router from "./Pages/router/routes";

const App = () => {
  return <>
     <RouterProvider router={router} />
  </>
};

export default App;
