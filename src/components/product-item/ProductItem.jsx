import React from "react";
import {
  HiChevronRight,
  HiCurrencyDollar,
  HiShoppingCart,
} from "react-icons/hi";
import { useNavigate } from "react-router";
import "../product-item/ProductItem.scss";

export const ProductItem = ({ title, id, sale, description, cost, img }) => {
  const navigate = useNavigate();

  return (
    <div
      className="product"
      onClick={() => navigate(`/products/product/${id}`)}
    >
      <div className="product-title">
        <img src={img} alt="product" />
        <div>
          <p className="product-title">{title.slice(0, 38)}</p>
          <p className="product-sub">{description.slice(0, 52)}...</p>
          <div className="product-cost">
            <p className="product-cost-el">
              <HiShoppingCart size="25px" /> {sale}
            </p>
            <p className="product-cost-el">
              <HiCurrencyDollar size="25px" /> {cost}
            </p>
          </div>
        </div>
      </div>

      <div className="product-content">
        <div className="product-count">
          <HiChevronRight
            className="product-icon"
            size="30px"
            color="#5EB5F7"
          />
        </div>
      </div>
    </div>
  );
};
