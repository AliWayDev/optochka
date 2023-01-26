import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../components/layout/Layout";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "../innerProduct/innerProduct.scss";
import { HiCheckCircle, HiShoppingCart } from "react-icons/hi";
import { useParams } from "react-router";
import axios from "axios";
import { Loader } from "../../components/Loader/Loader";

const links = [
  "https://static01.nyt.com/images/2013/09/22/magazine/22wmt/22wmt-superJumbo-v2.jpg",
  "https://static01.nyt.com/images/2013/09/22/magazine/22wmt/22wmt-superJumbo-v2.jpg",
  "https://static01.nyt.com/images/2013/09/22/magazine/22wmt/22wmt-superJumbo-v2.jpg",
  "https://static01.nyt.com/images/2013/09/22/magazine/22wmt/22wmt-superJumbo-v2.jpg",
  "https://static01.nyt.com/images/2013/09/22/magazine/22wmt/22wmt-superJumbo-v2.jpg",
];

const catalogs = [
  {
    id: 1,
    name: "S",
  },
  {
    id: 2,
    name: "M",
  },
  {
    id: 3,
    name: "L",
  },
  {
    id: 4,
    name: "XL",
  },
];

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
  let [product, setProduct] = useState(1);

  let mock = {
    title: "Browse premium related images on iStock",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
  };

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
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const renderSlides = product?.media?.map((links) => (
    <SplideSlide>
      <img className="inner-img" src={links} alt="Image 1" />
    </SplideSlide>
  ));

  const style = (el) => {
    return el.id === id
      ? { backgroundColor: "#5EB5F7" }
      : { backgroundColor: "#17212B" };
  };

  const catalogHandler = (id) => {};

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
            {catalogs.map((el) => (
              <div
                key={el.id}
                style={style(el)}
                onClick={() => catalogHandler(el?.id)}
              >
                <HiCheckCircle /> <p>{el.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="inner-button">
          <button>
            <HiShoppingCart /> Add to Cart{" "}
          </button>
        </div>
      </div>
    </Layout>
  );
};
