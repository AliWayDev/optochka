import React from "react";
import { HiChevronRight } from "react-icons/hi";
import { useNavigate } from "react-router";
import "../category-item/CategoryItem.scss";

export const CategoryItem = ({ title, id, brandId, length }) => {
  const navigate = useNavigate();

  return (
    <div
      className="item"
      onClick={() => navigate(`/products/${id}/${brandId}`)}
    >
      <p className="item-title">{title}</p>

      <div className="item-count">
        <span>{length}</span>
        <HiChevronRight className="item-icon" size="30px" />
      </div>
    </div>
  );
};
