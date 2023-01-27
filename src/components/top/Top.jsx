import React, { useEffect, useState } from "react";
import { HiChevronDoubleLeft, HiSearch, HiShoppingCart } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import "../top/Top.scss";

export const Top = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [search, setSearch] = useState(false);
  const brand = localStorage.getItem("brand");
  const { boolean } = useParams();

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    if (window.location.pathname !== "/products/search") {
      setSearch(true);
    } else {
      setSearch(false);
    }
  }, []);

  useEffect(() => {
    if (boolean === "true") {
      setSearch(false);
      setDisabled(false);
    } else {
      setSearch(true);
      setDisabled(true);
    }
  });

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
        {search && (
          <div
            className="top-search"
            onClick={() => navigate(`/products/search/${brand}/false`)}
          >
            <HiSearch size="25px" />
          </div>
        )}
        <div className="top-basket" onClick={() => navigate("/basket")}>
          <HiShoppingCart size="25px" />
          <span className="top-dot">3</span>
        </div>
      </div>
    </div>
  );
};
