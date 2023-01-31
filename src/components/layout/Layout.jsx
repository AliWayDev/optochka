import React, { useContext, useEffect, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router";
import { StoreContext } from "../../utils/store";
import "../layout/Layout.scss";
import { Top } from "../top/Top";

export const Layout = ({ children }) => {
  const { cart, notify } = useContext(StoreContext);
  const navigate = useNavigate();

  const funcSwitcher = () => {
    return navigate("/basket");
  };

  return (
    <div className="layout">
      <div className="container">
        <Top />
        <div className="layout-content">{children}</div>
        <div className={notify.notify ? `layout-button avil` : `layout-button`}>
          <button onClick={() => funcSwitcher()}>
            <HiShoppingCart />
            {`Cart: ` + cart.cart?.length}
          </button>
        </div>
      </div>
    </div>
  );
};
