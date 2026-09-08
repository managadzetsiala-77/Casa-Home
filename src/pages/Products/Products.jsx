import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../data/products";

import "./Products.scss";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("ყველა");
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "ყველა") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

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
      
      <div className="products-page__content">
      <button
  className="back-button"
  onClick={() => navigate(-1)}
>
  ← უკან დაბრუნება
</button>
        <div className="section-heading">
 
          <h1>პროდუქტები</h1>
          <p>აირჩიე სასურველი პროდუქტი</p>
        </div>

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
            <span>კატეგორია</span>

            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleCategoryChange(category)
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
          <h2>პროდუქტები</h2>

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
            <h2>პროდუქტი ვერ მოიძებნა</h2>

            <p>
              შეცვალე ძიების ტექსტი ან ფილტრები.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Products;