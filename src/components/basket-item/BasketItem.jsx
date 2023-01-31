import React, { useContext, useEffect } from "react";
import {
  HiChevronRight,
  HiCurrencyDollar,
  HiMinus,
  HiPlus,
  HiShoppingCart,
} from "react-icons/hi";
import { StoreContext } from "../../utils/store";
import "../basket-item/BasketItem.scss";

export const BasketItem = ({
  title = "xmxm",
  id,
  index,
  description = "xmxm",
  cost = 300,
  img,
  el,
  setEl,
}) => {
  const { cart } = useContext(StoreContext);

  const add = () => {
    let newArr = [...cart.cart];

    newArr[id] = {
      ...newArr[id],
      quantity: newArr[id].quantity + 1,
    };

    cart.setCart(newArr);
  };

  const inc = () => {
    if (cart.cart[id].quantity === 1) {
      cart.setCart(
        cart.cart.filter((item) => item.product_id !== index.toString())
      );
      setEl(el.filter((item) => item.id !== index));
      return;
    }

    let newArr = [...cart.cart];
    newArr[id] = {
      ...newArr[id],
      quantity: newArr[id].quantity - 1,
    };

    cart.setCart(newArr);
  };

  return (
    <div className="inner-basket">
      <div className="inner-basket-title">
        <img src={img} alt="product" />
        <div>
          <p className="inner-basket-title">{title.slice(0, 38)}</p>
          <p className="inner-basket-sub">{description.slice(0, 52)}...</p>
          <div className="inner-basket-cost">
            <p className="inner-basket-cost-el">
              <HiCurrencyDollar size="25px" /> {cost}
            </p>
          </div>
        </div>
      </div>

      <div className="inner-basket-content">
        <div className="inner-basket-count">
          <HiPlus
            className="inner-basket-icon"
            size="30px"
            color="#5EB5F7"
            onClick={() => add()}
          />
          {cart.cart[id]?.quantity}
          <HiMinus
            className="inner-basket-icon"
            size="30px"
            color="#5EB5F7"
            onClick={() => inc()}
          />
        </div>
      </div>
    </div>
  );
};
