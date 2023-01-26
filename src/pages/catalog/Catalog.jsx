import axios from "axios";
import React, { useEffect, useState } from "react";
import { CategoryItem } from "../../components/category-item/CategoryItem";
import { Layout } from "../../components/layout/Layout";
import { Loader } from "../../components/Loader/Loader";
import { Modal } from "../../components/modal/Modal";
import "../catalog/Catalog.scss";

export const Catalog = () => {
  const [catalog, setCatalog] = useState([]);
  const [len, setLen] = useState([]);

  const getCatalog = async () => {
    const config = {
      method: "get",
      url: `https://dev-upost.mollys.uz/categories?brand_id=${193}`,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJmaXJzdF9uYW1lIjoiQWxpIiwibGFzdF9uYW1lIjoieG14bSIsInBob25lX251bWJlciI6Iis5OTgyMjIyMjIyMjIiLCJ1c2VybmFtZSI6bnVsbCwiYnJhbmRzIjpbMTc2XSwiaWF0IjoxNjczOTQ4ODU3LCJleHAiOjE2NzY1NDA4NTd9.eJNmz3x_VG72_vUAn2Qdw9dBjHAbdKc2ZY4sxadPPZ8",
      },
    };

    await axios(config).then((res) => {
      setCatalog(res.data);

      for (let xm of res.data) {
        const config = {
          method: "get",
          url: `https://dev-upost.mollys.uz/products/brands/${193}/categories/${
            xm.id
          }`,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIwLCJmaXJzdF9uYW1lIjoiQWxpIiwibGFzdF9uYW1lIjoieG14bSIsInBob25lX251bWJlciI6Iis5OTgyMjIyMjIyMjIiLCJ1c2VybmFtZSI6bnVsbCwiYnJhbmRzIjpbMTc2XSwiaWF0IjoxNjczOTQ4ODU3LCJleHAiOjE2NzY1NDA4NTd9.eJNmz3x_VG72_vUAn2Qdw9dBjHAbdKc2ZY4sxadPPZ8",
          },
        };

        axios(config).then((res) => {
          setLen((prevState) => [...prevState, res.data?.length]);
        });
      }
    });
  };

  useEffect(() => {
    getCatalog();
  }, []);

  const catalogs = catalog.map((el) => (
    <CategoryItem key={el?.id} title={el.name} length={el?.products_length} id={el.id} brandId={193} />
  ));

  if(catalog?.length < 1) {
    return (
      <Loader />
    )
  }

  return (
    <Layout>
      <div className="catalog">
        <p>Categories:</p>

        {catalogs}
      </div>
      {/* <Modal title='Ibrat aka trash' info='trash' /> */}
    </Layout>
  );
};
