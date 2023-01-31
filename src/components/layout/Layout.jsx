import React, { useContext } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router";
import { StoreContext } from "../../utils/store";
import "../layout/Layout.scss";
import { Top } from "../top/Top";

export const Layout = ({ children }) => {
  const { cart, summ } = useContext(StoreContext);
  const navigate = useNavigate();

  const urlSwitcher = () => {
    if (window.location.pathname === "/basket") {
      return `Total: ` + summ.sum;
    } else {
      return `Cart: ` + cart.cart?.length;
    }
  };

  const funcSwitcher = () => {
    if (window.location.pathname !== "/basket") {
      return navigate("/basket");
    } else {
      navigate(`/${localStorage.getItem("brand")}`);
      alert("Yahu order is completed!");
      return;
    }
  };

  return (
    <div className="layout">
      <div className="container">
        <Top />
        <div className="layout-content">{children}</div>
        <div className="layout-button">
          <button onClick={() => funcSwitcher()}>
            <HiShoppingCart />
            {urlSwitcher()}
          </button>
        </div>
      </div>
    </div>
  );
};
