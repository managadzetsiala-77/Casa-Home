import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";
import "./Cart.scss";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <main className="cart">
        <div className="cart__container">
          <div className="cart__empty">
            <span className="cart__empty-icon">🛒</span>

            <h1>თქვენი კალათა ცარიელია</h1>

            <p>
              ჯერ არ დაგიმატებიათ პროდუქტი კალათაში.
            </p>

            <Link to="/products" className="cart__continue">
  პროდუქტების ნახვა
</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="cart__container">

        <div className="cart__header">
          <h1>ჩემი კალათა</h1>

          <span>
            {cartItems.length} პროდუქტი
          </span>
        </div>

        <div className="cart__content">

          <div className="cart__items">

            {cartItems.map((item) => (
              <div className="cart__item" key={item.id}>

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart__image"
                />

                <div className="cart__info">

                  <h2>{item.name}</h2>

                  <p className="cart__category">
                    {item.category}
                  </p>

                  <p className="cart__price">
                    {item.price} ₾
                  </p>

                </div>

                <div className="cart__quantity">

                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>

                </div>

                <div className="cart__item-total">
                  {item.price * item.quantity} ₾
                </div>

                <button
                  className="cart__remove"
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                  aria-label="პროდუქტის წაშლა"
                >
                  🗑
                </button>

              </div>
            ))}

          </div>

          <aside className="cart__summary">

            <h2>შეკვეთის შეჯამება</h2>

            <div className="cart__summary-row">
              <span>პროდუქტები</span>
              <span>{totalPrice} ₾</span>
            </div>

            <div className="cart__summary-row">
              <span>მიწოდება</span>
              <span>უფასო</span>
            </div>

            <div className="cart__summary-total">
              <span>სულ</span>
              <strong>{totalPrice} ₾</strong>
            </div>

            <Link
  to="/checkout"
  className="cart__checkout"
>
  შეკვეთის გაფორმება
</Link>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;