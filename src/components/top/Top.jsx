import React, { useContext, useEffect, useState } from "react";
import { HiChevronDoubleLeft, HiSearch, HiShoppingCart } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import { StoreContext } from "../../utils/store";
import "../top/Top.scss";

export const Top = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const brand = localStorage.getItem("brand");
  const { cart } = useContext(StoreContext);
  const { id } = useParams();

  useEffect(() => {
    if (id?.length > 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    if (window.location.pathname === "/basket") {
      setDisabled(true);
    }
  }, []);

  const setStyle = () => {
    if (!disabled) {
      return {
        marginLeft: "30px",
      };
    }
  };

  return (
    <div className="top">
      {disabled && (
        <div className="top-back" onClick={() => navigate(-1)}>
          <HiChevronDoubleLeft size="25px" />
        </div>
      )}
      <div className="top-title" style={setStyle()}>
        Molly’s Shop
      </div>
      <div className="top-right">
        <div
          className="top-search"
          onClick={() => navigate(`/products/search/${brand}/false`)}
        >
          <HiSearch size="25px" />
        </div>
        <div className="top-basket" onClick={() => navigate("/basket")}>
          <HiShoppingCart size="25px" />
          <span className="top-dot">{cart.cart?.length}</span>
        </div>
      </div>
    </div>
  );
};
