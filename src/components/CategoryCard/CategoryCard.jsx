
import { Link } from "react-router-dom";

import sofasImage from "../../assets/categories/sofas.jpg";
import bedsImage from "../../assets/categories/beds.jpg";
import chairsImage from "../../assets/categories/chairs.jpg";
import tablesImage from "../../assets/categories/tables.jpg";
import lightingImage from "../../assets/categories/lighting.jpg";
import decorImage from "../../assets/categories/decor.jpg";

import "./CategoryCard.scss";

const categoryImages = {
  დივნები: sofasImage,
  საწოლები: bedsImage,
  სკამები: chairsImage,
  მაგიდები: tablesImage,
  განათება: lightingImage,
  დეკორი: decorImage,
};

function CategoryCard({ category }) {
  const image = categoryImages[category.name];

  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="category-card"
    >
      <div className="category-card__image">
        <img
          src={image}
          alt={category.name}
          loading="lazy"
        />

        <span className="category-card__arrow">
          →
        </span>
      </div>

      <h3 className="category-card__title">
        {category.name}
      </h3>
    </Link>
  );
}

export default CategoryCard;