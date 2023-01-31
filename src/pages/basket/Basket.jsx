import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router";
import { BasketItem } from "../../components/basket-item/BasketItem";
import { Layout } from "../../components/layout/Layout";
import { StoreContext } from "../../utils/store";
import "../basket/Basket.scss";

function add(accumulator, a) {
  return accumulator + a;
}

export const Basket = () => {
  const { cart, summ } = useContext(StoreContext);
  const navigate = useNavigate();
  const [el, setEl] = useState([]);
  const [sum, setSum] = useState([]);

  const getEl = async () => {
    for (let i = 0; i < cart.cart?.length; i++) {
      const config = {
        method: "get",
        url: `https://dev-upost.mollys.uz/products/${cart.cart[i].product_id}`,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJmaXJzdF9uYW1lIjoiQWxpIiwibGFzdF9uYW1lIjoieG14bSIsInBob25lX251bWJlciI6Iis5OTgyMjIyMjIyMjIiLCJ1c2VybmFtZSI6bnVsbCwiYnJhbmRzIjpbMTc2XSwiaWF0IjoxNjczOTQ4ODU3LCJleHAiOjE2NzY1NDA4NTd9.eJNmz3x_VG72_vUAn2Qdw9dBjHAbdKc2ZY4sxadPPZ8",
        },
      };

      await axios(config).then((res) => {
        setEl((prev) => [...prev, res.data]);
      });
    }
  };

  useEffect(() => {
    getEl();
  }, []);

  useEffect(() => {
    setSum([]);

    for (let i = 0; i < cart.cart?.length; i++) {
      setSum((prev) => [...prev, cart.cart[i].price * cart.cart[i].quantity]);
    }
  }, [cart.cart]);

  useEffect(() => {
    summ.setSum(sum.reduce(add, 0));
  }, [sum]);

  const order = () => {
    navigate(`/${localStorage.getItem("brand")}`);
    alert("Yahu order is completed!");
    window.location.reload();
  };

  return (
    <Layout>
      <div className="basket">
        <div className="basket-title">
          Cart: {el?.length < 1 && "You haven't add ant thing"}
        </div>

        {el.map((ele, index) => (
          <BasketItem
            id={index}
            index={ele?.id}
            title={ele.name}
            img={ele?.media[0]}
            description={ele?.description}
            cost={ele?.price}
            setEl={setEl}
            el={el}
          />
        ))}

        <div className="basket-button">
          <button onClick={() => order()}>
            <HiShoppingCart />
            Total: {summ.sum}
          </button>
        </div>
      </div>
    </Layout>
  );
};
