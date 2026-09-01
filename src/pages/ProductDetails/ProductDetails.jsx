import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../../data/products";
import "./ProductDetails.scss";
function ProductDetails() {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <main className="product-details">
        <div className="product-details__not-found">
          <h1>პროდუქტი ვერ მოიძებნა</h1>

          <Link to="/products">
            პროდუქტებზე დაბრუნება
          </Link>
        </div>
      </main>
    );
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <main className="product-details">
      <div className="product-details__container">

        <div className="product-details__breadcrumbs">
          <Link to="/">
            მთავარი
          </Link>

          <span>/</span>

          <Link to="/products">
            პროდუქტები
          </Link>

          <span>/</span>

          <span>{product.name}</span>
        </div>

        <div className="product-details__content">

          <div className="product-details__image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="product-details__image"
            />

            <span className="product-details__badge">
              -{Math.round(
                ((product.oldPrice - product.price) /
                  product.oldPrice) *
                  100
              )}
              %
            </span>
          </div>

          <div className="product-details__info">

            <p className="product-details__category">
              {product.category}
            </p>

            <h1 className="product-details__title">
              {product.name}
            </h1>

            <div className="product-details__rating">
              <span>★</span>

              <span>
                {product.rating}
              </span>

              <span>
                შეფასება
              </span>
            </div>

            <div className="product-details__prices">

              <span className="product-details__price">
                {product.price} ₾
              </span>

              <span className="product-details__old-price">
                {product.oldPrice} ₾
              </span>

            </div>

            <p className="product-details__description">
              თანამედროვე და კომფორტული პროდუქტი,
              რომელიც იდეალურად მოერგება შენს
              ინტერიერს. შექმენი მყუდრო და
              გამორჩეული სივრცე CasaHome-თან ერთად.
            </p>

            <div className="product-details__quantity">

              <span>
                რაოდენობა
              </span>

              <div className="quantity-control">

                <button
                  onClick={decreaseQuantity}
                  aria-label="რაოდენობის შემცირება"
                >
                  -
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  aria-label="რაოდენობის გაზრდა"
                >
                  +
                </button>

              </div>
            </div>

            <div className="product-details__actions">

              <button className="product-details__cart-button">
                კალათაში დამატება
              </button>

              <button
                className="product-details__favorite-button"
                aria-label="რჩეულებში დამატება"
              >
                ♡
              </button>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;