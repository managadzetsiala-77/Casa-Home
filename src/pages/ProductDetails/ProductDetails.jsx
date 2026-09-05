import { Link, useParams } from "react-router-dom";
import { products } from "../../data/products";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { toggleFavorite } from "../../store/favoritesSlice";
import "./ProductDetails.scss";

function ProductDetails() {
  const [selectedRating, setSelectedRating] = useState(0);
const [comment, setComment] = useState("");
const [reviews, setReviews] = useState([]);
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
  useEffect(() => {
    const savedReviews = JSON.parse(
      localStorage.getItem(`reviews-${id}`)
    ) || [];
  
    setReviews(savedReviews);
  }, [id]);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
  
    if (!selectedRating || !comment.trim()) {
      alert("გთხოვ, შეავსე შეფასება და კომენტარი.");
      return;
    }
  
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );
  
    const newReview = {
      id: Date.now(),
      name: currentUser?.name || "მომხმარებელი",
      rating: selectedRating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString("ka-GE"),
    };
  
    const updatedReviews = [
      newReview,
      ...reviews,
    ];
  
    setReviews(updatedReviews);
  
    localStorage.setItem(
      `reviews-${id}`,
      JSON.stringify(updatedReviews)
    );
  
    setSelectedRating(0);
    setComment("");
  
    alert("მადლობა შეფასებისთვის! ⭐");
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
        <section className="product-details__reviews">
  <div className="product-details__reviews-header">
    <div>
      <h2>მომხმარებლის შეფასებები</h2>
      <p>გაგვიზიარე შენი გამოცდილება</p>
    </div>

    <div className="product-details__overall-rating">
      <span>★</span>
      <strong>{product.rating}</strong>
      <small>საერთო შეფასება</small>
    </div>
  </div>

  <div className="product-details__review-list">
  {reviews.length === 0 ? (
    <p className="product-details__no-reviews">
      ჯერ შეფასება არ არის. იყავი პირველი ვინც შეაფასებს პროდუქტს ⭐
    </p>
  ) : (
    reviews.map((review) => (
      <article
        className="product-details__review"
        key={review.id}
      >
        <div className="product-details__review-top">
          <strong>{review.name}</strong>

          <span>
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </span>
        </div>

        <p>{review.comment}</p>

        <small>{review.date}</small>
      </article>
    ))
  )}
</div>

  <form
    className="product-details__review-form"
    onSubmit={handleReviewSubmit}
  >
    <h3>შეაფასე პროდუქტი</h3>

    <div className="product-details__stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => setSelectedRating(star)}
          className={star <= selectedRating ? "active" : ""}
        >
          ★
        </button>
      ))}
    </div>

    <textarea
      value={comment}
      onChange={(event) => setComment(event.target.value)}
      placeholder="დაწერე შენი კომენტარი..."
      rows="5"
    />

    <button
      type="submit"
      className="product-details__review-submit"
    >
      შეფასების გაგზავნა
    </button>
  </form>
</section>
      </div>
    </main>
  );
}

export default ProductDetails;