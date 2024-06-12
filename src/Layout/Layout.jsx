import React from "react";
import Navigation from "../Shared/Navigation";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
