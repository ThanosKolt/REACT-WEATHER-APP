import React from "react";
import Searchbar from "./Searchbar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div className="page-container">
      <Searchbar />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
