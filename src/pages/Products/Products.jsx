import { useMemo, useState } from "react";

import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";

import "./Products.scss";

function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ყველა");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = [
    "ყველა",
    "დივნები",
    "საწოლები",
    "სკამები",
    "მაგიდები",
    "განათება",
    "დეკორი",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "ყველა" ||
        product.category === selectedCategory;

      const matchesPrice =
        maxPrice === "" ||
        product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });
  }, [search, selectedCategory, maxPrice]);

  return (
    <main className="products-page">

      <section className="products-page__hero">
        <div className="products-page__container">

          <p className="products-page__subtitle">
            CasaHome კოლექცია
          </p>

          <h1 className="products-page__title">
            ყველა პროდუქტი
          </h1>

          <p className="products-page__description">
            იპოვე შენი სახლისთვის იდეალური პროდუქტი
          </p>

        </div>
      </section>

      <section className="products-page__content">
        <div className="products-page__container">

          <div className="filters">

            <div className="filters__search">
              <label htmlFor="search">
                პროდუქტის ძიება
              </label>

              <input
                id="search"
                type="text"
                placeholder="მოძებნე პროდუქტი..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="filters__category">

              <span>
                კატეგორია
              </span>

              <div className="category-buttons">

                {categories.map((category) => (
                  <button
                    key={category}
                    className={
                      selectedCategory === category
                        ? "category-button category-button--active"
                        : "category-button"
                    }
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                  >
                    {category}
                  </button>
                ))}

              </div>
            </div>

            <div className="filters__price">

              <label htmlFor="maxPrice">
                მაქსიმალური ფასი
              </label>

              <input
                id="maxPrice"
                type="number"
                placeholder="მაგ: 2000"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(event.target.value)
                }
              />

            </div>

          </div>

          <div className="products-header">

            <h2>
              პროდუქტები
            </h2>

            <span>
              ნაპოვნია: {filteredProducts.length}
            </span>

          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">

              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>
          ) : (
            <div className="products-empty">

              <h2>
                პროდუქტი ვერ მოიძებნა
              </h2>

              <p>
                შეცვალე ძიების ტექსტი ან ფილტრები.
              </p>

            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Products;