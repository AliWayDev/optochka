import React from "react";
import {
  HiChevronRight,
  HiCurrencyDollar,
  HiMinus,
  HiPlus,
  HiShoppingCart,
} from "react-icons/hi";
import "../basket-item/BasketItem.scss";

export const BasketItem = ({
  title = "xmxm",
  id,
  sale = "0",
  description = "xmxm",
  cost = 300,
  img,
}) => {
  return (
    <div className="inner-basket">
      <div className="inner-basket-title">
        <img
          src="https://media.gq.com/photos/6256dc8bd799f7841ada56e9/master/w_2000,h_1333,c_limit/shirt.jpg"
          alt="product"
        />
        <div>
          <p className="inner-basket-title">{title.slice(0, 38)}</p>
          <p className="inner-basket-sub">{description.slice(0, 52)}...</p>
          <div className="inner-basket-cost">
            <p className="inner-basket-cost-el">
              <HiShoppingCart size="25px" /> {sale}
            </p>
            <p className="inner-basket-cost-el">
              <HiCurrencyDollar size="25px" /> {cost}
            </p>
          </div>
        </div>
      </div>

      <div className="inner-basket-content">
        <div className="inner-basket-count">
          <HiPlus className="inner-basket-icon" size="30px" color="#5EB5F7" />
          0
          <HiMinus className="inner-basket-icon" size="30px" color="#5EB5F7" />
        </div>
        <p className="inner-basket-sum">240 K</p>
      </div>
    </div>
  );
};
