import React from "react";
import { Layout } from "../layout/Layout";
import "../Loader/Loader.scss";

export const Loader = () => {
  return (
    <Layout>
      <div className="load">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};
