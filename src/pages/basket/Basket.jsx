import React from "react";
import { BasketItem } from "../../components/basket-item/BasketItem";
import { Layout } from "../../components/layout/Layout";
import "../basket/Basket.scss";

let cart = ["xmm", "xmm", "xnmm", "xnxm"];

export const Basket = () => {
  return (
    <Layout>
      <div className="basket">
        <div className="basket-title">Cart:</div>

        {cart.map(() => (
          <BasketItem />
        ))}
      </div>
    </Layout>
  );
};
