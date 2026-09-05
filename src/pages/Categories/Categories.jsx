import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import "./Categories.scss";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("ყველა");

  const categories = [
    "ყველა",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "ყველა"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <main className="categories">
      <div className="categories__container">

        <div className="categories__header">
          <span>CasaHome</span>
          <h1>კატეგორიები</h1>
          <p>
            აღმოაჩინე ავეჯი და დეკორი შენი იდეალური
            ინტერიერისთვის.
          </p>
        </div>

        <div className="categories__buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="categories__products">
          {filteredProducts.map((product) => (
            <Link
              to={`/products/${product.id}`}
              className="categories__card"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <div className="categories__card-info">
                <span>{product.category}</span>

                <h2>{product.name}</h2>

                <strong>{product.price} ₾</strong>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

export default Categories;