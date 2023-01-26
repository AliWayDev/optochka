import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Layout } from "../../components/layout/Layout";
import { ProductItem } from "../../components/product-item/ProductItem";
import "../search/Search.scss";

export const Search = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const brandId = localStorage.getItem('brand')

  const getProducts = async () => {
    const config = {
      method: "get",
      url: `https://dev-upost.mollys.uz/products?brandId=${brandId}&name=${search}`,
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
    getProducts();
  }, [search, getProducts]);

  const isData = () => {
    if (product?.length < 1) {
      return (
        <div className="load">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    } else {
      return product.map((el) => (
        <div>
          <ProductItem
            id={el?.id}
            img={el?.media[0]}
            title={el?.name}
            sale={el?.sold}
            description={el?.description}
            cost={el?.price}
          />
        </div>
      ));
    }
  };

  return (
    <Layout>
      <div className="search">
        <div className="search-block">
          <div className="search-icon">
            <HiSearch size="24px" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {isData()}
      </div>
    </Layout>
  );
};
