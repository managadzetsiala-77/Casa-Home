import { Link, useParams } from "react-router-dom";
import { products } from "../../data/products";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { toggleFavorite } from "../../store/favoritesSlice";
import "./ProductDetails.scss";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = cartItems.some(
    (item) => item.id === product?.id
  );

  const handleFavorite = () => {
    if (!product) return;

    dispatch(toggleFavorite(product));
  };

  const handleAddToCart = () => {
    if (!product || isInCart) {
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

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

  return (
    <main className="product-details">
      <div className="product-details__container">

        <div className="product-details__breadcrumbs">
          <Link to="/">მთავარი</Link>

          <span>/</span>

          <Link to="/products">პროდუქტები</Link>

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
              -
              {Math.round(
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

              <span>{product.rating}</span>

              <span>შეფასება</span>
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
              თანამედროვე და კომფორტული პროდუქტი, რომელიც
              იდეალურად მოერგება შენს ინტერიერს. შექმენი
              მყუდრო და გამორჩეული სივრცე CasaHome-თან ერთად.
            </p>

            {isInCart && (
              <p className="product-details__cart-message">
                ✓ ეს პროდუქტი უკვე დამატებულია კალათაში.
                <br />
                რაოდენობის შეცვლა შეგიძლია კალათიდან.
              </p>
            )}

            <div className="product-details__actions">

              <button
                className="product-details__cart-button"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart
                  ? "✓ დამატებულია კალათაში"
                  : "კალათაში დამატება"}
              </button>

              {isInCart && (
                <Link
                  to="/cart"
                  className="product-details__cart-link"
                >
                  კალათის ნახვა →
                </Link>
              )}

              <button
                className="product-details__favorite-button"
                onClick={handleFavorite}
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