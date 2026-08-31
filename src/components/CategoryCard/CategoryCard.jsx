import { Link } from "react-router-dom";

import "./CategoryCard.scss";

function CategoryCard({ category }) {
  return (
    <Link
      to="/products"
      className="category-card"
    >
      <span className="category-card__icon">
        {category.icon}
      </span>

      <h3 className="category-card__name">
        {category.name}
      </h3>

      <span className="category-card__arrow">
        →
      </span>
    </Link>
  );
}

export default CategoryCard;