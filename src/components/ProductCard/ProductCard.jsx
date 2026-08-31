import { Link } from "react-router-dom";

import "./ProductCard.scss";

function ProductCard({ product }) {
  return (
    <article className="product-card">

      <div className="product-card__image-wrapper">

        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
        />

        <span className="product-card__badge">
          -{Math.round(
            ((product.oldPrice - product.price) /
              product.oldPrice) *
              100
          )}
          %
        </span>

        <button
          className="product-card__favorite"
          aria-label="რჩეულებში დამატება"
        >
          ♡
        </button>
      </div>

      <div className="product-card__content">

        <p className="product-card__category">
          {product.category}
        </p>

        <h3 className="product-card__name">
          {product.name}
        </h3>

        <div className="product-card__rating">
          <span>★</span>
          <span>{product.rating}</span>
        </div>

        <div className="product-card__bottom">

          <div className="product-card__prices">
            <span className="product-card__price">
              {product.price} ₾
            </span>

            <span className="product-card__old-price">
              {product.oldPrice} ₾
            </span>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="product-card__details"
          >
            დეტალები
          </Link>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;