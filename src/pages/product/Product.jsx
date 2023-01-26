import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Layout } from "../../components/layout/Layout";
import { Loader } from "../../components/Loader/Loader";
import { ProductItem } from "../../components/product-item/ProductItem";
import "../product/Product.scss";

export const Product = () => {
  const { id, brandId } = useParams();
  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    const config = {
      method: "get",
      url: `https://dev-upost.mollys.uz/products/brands/${brandId}/categories/${id}`,
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
  }, []);

  if(product?.length < 1) {
    return (
      <Loader />
    )
  }


  return (
    <Layout>
      <div className="products">
        <p className="products-title">Suits:</p>
        <div>
          {product.map((el) => (
            <ProductItem
              id={el?.id}
              img={el?.media[0]}
              title={el?.name}
              sale={el?.sold}
              description={el?.description}
              cost={el?.price}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};
