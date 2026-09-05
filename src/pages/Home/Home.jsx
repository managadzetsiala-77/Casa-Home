import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { slides } from "../../data/slides";
import "./Home.scss";
import { categories } from "../../data/categories";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";



function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        if (prevSlide === slides.length - 1) {
          return 0;
        }

        return prevSlide + 1;
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const slide = slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <main className="home">
      <section
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(31, 31, 31, 0.75),
              rgba(31, 31, 31, 0.2)
            ),
            url(${slide.image})
          `,
        }}
      >
        <div className="hero__content">
          <p className="hero__subtitle">
            {slide.subtitle}
          </p>

          <h1 className="hero__title">
            {slide.title}
          </h1>

          <p className="hero__text">
            {slide.text}
          </p>

          <button className="hero__button">
            პროდუქტების ნახვა
          </button>
        </div>

        <button
          className="hero__arrow hero__arrow--left"
          onClick={previousSlide}
          aria-label="წინა სლაიდი"
        >
          ←
        </button>

        <button
          className="hero__arrow hero__arrow--right"
          onClick={nextSlide}
          aria-label="შემდეგი სლაიდი"
        >
          →
        </button>

        <div className="hero__dots">
          {slides.map((item, index) => (
            <button
              key={item.id}
              className={
                currentSlide === index
                  ? "hero__dot hero__dot--active"
                  : "hero__dot"
              }
              onClick={() => setCurrentSlide(index)}
              aria-label={`სლაიდი ${index + 1}`}
            />
          ))}
        </div>
      </section>
      <section className="categories">
  <div className="categories__container">

    <div className="section-heading">
      <p className="section-heading__subtitle">
        აღმოაჩინე ჩვენი კოლექცია
      </p>

      <h2 className="section-heading__title">
        კატეგორიები
      </h2>

      <p className="section-heading__text">
        იპოვე ყველაფერი შენი სახლისთვის
      </p>
    </div>

    <div className="categories__grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </div>

  </div>
</section>
<section className="products-section">
  <div className="products-section__container">

    <div className="section-heading">
      <p className="section-heading__subtitle">
        ჩვენი რჩეული
      </p>

      <h2 className="section-heading__title">
        პოპულარული პროდუქტები
      </h2>

      <p className="section-heading__text">
        აღმოაჩინე ჩვენი ყველაზე მოთხოვნადი პროდუქტები
      </p>
    </div>

    <div className="products-section__grid">
      {products.slice(0, visibleCount).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>

    {visibleCount < products.length && (
      <div className="products-section__button-wrapper">
        <button
          className="products-section__button"
          onClick={() =>
            setVisibleCount((prev) => prev + 6)
          }
        >
          მეტი პროდუქტი
        </button>
      </div>
    )}


    <div className="products-section__button-wrapper">
      <Link
        to="/products"
        className="products-section__button"
      >
        ყველა პროდუქტის ნახვა
      </Link>
    </div>

  </div>
</section>
    </main>
  );
}

export default Home;