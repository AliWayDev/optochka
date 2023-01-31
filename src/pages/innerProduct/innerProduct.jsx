import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout/Layout";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "../innerProduct/innerProduct.scss";
import { HiCheckCircle, HiShoppingCart } from "react-icons/hi";
import { useParams } from "react-router";
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";
import { StoreContext } from "../../utils/store";

const mainOptions = {
  type: "loop",
  perPage: 1,
  perMove: 1,
  arrows: false,
  pagination: false,
  height: "20rem",
};

const thumbsOptions = {
  type: "slide",
  rewind: true,
  gap: "1rem",
  pagination: false,
  fixedWidth: 110,
  fixedHeight: 70,
  cover: true,
  focus: "center",
  isNavigation: true,
};

export const InnerProduct = () => {
  const { id } = useParams();
  const { cart, notify } = useContext(StoreContext);
  const [product, setProduct] = useState(1);
  const [sizeId, setSizeId] = useState();
  const [disabled, setDisabled] = useState(false);

  const [variations] = useState(product?.variations);
  const [size, setSize] = useState([]);

  let mainRef = useRef();
  let thumbsRef = useRef();

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  const getProduct = async () => {
    const config = {
      method: "get",
      url: `https://dev-upost.mollys.uz/products/${id}`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJmaXJzdF9uYW1lIjoiQWxpIiwibGFzdF9uYW1lIjoieG14bSIsInBob25lX251bWJlciI6Iis5OTgyMjIyMjIyMjIiLCJ1c2VybmFtZSI6bnVsbCwiYnJhbmRzIjpbMTc2XSwiaWF0IjoxNjczOTQ4ODU3LCJleHAiOjE2NzY1NDA4NTd9.eJNmz3x_VG72_vUAn2Qdw9dBjHAbdKc2ZY4sxadPPZ8",
      },
    };

    await axios(config).then((res) => {
      setProduct(res.data);

      const config = {
        method: "post",
        url: `https://dev-upost.mollys.uz/products-variations/find-many-by-ids`,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJmaXJzdF9uYW1lIjoiQWxpIiwibGFzdF9uYW1lIjoieG14bSIsInBob25lX251bWJlciI6Iis5OTgyMjIyMjIyMjIiLCJ1c2VybmFtZSI6bnVsbCwiYnJhbmRzIjpbMTc2XSwiaWF0IjoxNjczOTQ4ODU3LCJleHAiOjE2NzY1NDA4NTd9.eJNmz3x_VG72_vUAn2Qdw9dBjHAbdKc2ZY4sxadPPZ8",
        },
        data: { ids: res.data.variations },
      };

      axios(config).then((res) => {
        setSize(res.data);
      });
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    for (let i = 0; i < cart.cart.length; i++) {
      if (cart.cart[i].product_id === id) {
        setDisabled(true);
      }
    }
  }, [cart, id]);

  // useEffect(() => {

  // }, [product?.variations]);

  const renderSlides = product?.media?.map((links) => (
    <SplideSlide>
      <img className="inner-img" src={links} alt={links} />
    </SplideSlide>
  ));

  const style = (el) => {
    return el.id === sizeId
      ? { backgroundColor: "#5EB5F7" }
      : { backgroundColor: "#17212B" };
  };

  const catalogHandler = (id) => {
    setSizeId(null);

    setSizeId(id);
  };

  const submitHandler = () => {
    notify.setNotify(true);

    setTimeout(() => {
      notify.setNotify(false);
    }, [2000]);

    let productItem = {
      product_id: id,
      quantity: 1,
      price: product.price,
    };

    cart.setCart((prev) => [...prev, productItem]);
  };

  if (!product?.media?.length > 0) {
    return <Loader />;
  }

  return (
    <Layout>
      <div className="inner">
        <div className="inner-slider">
          <Splide
            options={mainOptions}
            ref={mainRef}
            aria-labelledby="thumbnail-slider-example"
          >
            {renderSlides}
          </Splide>
          <div className="inner-subslider">
            <Splide
              options={thumbsOptions}
              ref={thumbsRef}
              aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
            >
              {renderSlides}
            </Splide>
          </div>
        </div>

        <div className="inner-content">
          <p className="inner-title">{product?.name?.slice(0, 38)}</p>
          <p className="inner-sub">{product?.description}</p>

          <div className="inner-catalogs">
            {size?.map((el) => (
              <div
                key={el.id}
                style={style(el)}
                onClick={() => catalogHandler(el?.id)}
                className="inner-size"
              >
                <HiCheckCircle /> <p>{el?.name}</p>
              </div>
            ))}
          </div>
        </div>
        {!disabled && (
          <div className="inner-button" onClick={() => submitHandler()}>
            <button>
              <HiShoppingCart /> Add to Cart{" "}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};
