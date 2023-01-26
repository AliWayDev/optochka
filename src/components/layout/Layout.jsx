import React from "react";
import "../layout/Layout.scss";
import { Top } from "../top/Top";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <div className="container">
        <Top />
        <div className="layout-content">

        {children}
        </div>
      </div>
    </div>
  );
};
