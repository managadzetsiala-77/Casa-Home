import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { clearCart } from "../../store/cartSlice";
import "./Checkout.scss";

const schema = yup.object({
  name: yup
    .string()
    .required("სახელი და გვარი სავალდებულოა")
    .min(3, "მინიმუმ 3 სიმბოლო"),

  phone: yup
    .string()
    .required("ტელეფონი სავალდებულოა")
    .min(9, "შეიყვანე სწორი ტელეფონის ნომერი"),

  email: yup
    .string()
    .email("შეიყვანე სწორი ელფოსტა")
    .required("ელფოსტა სავალდებულოა"),

  city: yup
    .string()
    .required("ქალაქი სავალდებულოა"),

  address: yup
    .string()
    .required("მისამართი სავალდებულოა")
    .min(5, "მისამართი ძალიან მოკლეა"),
});

function Checkout() {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  console.log("Checkout cart:", cartItems);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("შეკვეთის ინფორმაცია:", data);
  
    dispatch(clearCart());
  
    alert("შეკვეთა წარმატებით გაფორმდა! 🎉");
  
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <main className="checkout">
        <div className="checkout__empty">
          <h1>კალათა ცარიელია</h1>

          <p>
            შეკვეთის გასაფორმებლად ჯერ დაამატე პროდუქტი
            კალათაში.
          </p>

          <Link to="/products">
            პროდუქტების ნახვა
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout">
      <div className="checkout__container">

        <div className="checkout__header">
          <h1>შეკვეთის გაფორმება</h1>

          <p>
            შეავსე ინფორმაცია და დაასრულე შეკვეთა
          </p>
        </div>

        <div className="checkout__content">

          <form
            className="checkout__form"
            onSubmit={handleSubmit(onSubmit)}
          >

            <h2>მომხმარებლის ინფორმაცია</h2>

            <div className="checkout__field">
              <label>სახელი და გვარი</label>

              <input
                type="text"
                placeholder="მაგ. ნინო გიორგაძე"
                {...register("name")}
              />

              {errors.name && (
                <span>{errors.name.message}</span>
              )}
            </div>

            <div className="checkout__field">
              <label>ტელეფონი</label>

              <input
                type="tel"
                placeholder="5XX XX XX XX"
                {...register("phone")}
              />

              {errors.phone && (
                <span>{errors.phone.message}</span>
              )}
            </div>

            <div className="checkout__field">
              <label>ელფოსტა</label>

              <input
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
              />

              {errors.email && (
                <span>{errors.email.message}</span>
              )}
            </div>

            <h2>მიწოდების ინფორმაცია</h2>

            <div className="checkout__field">
              <label>ქალაქი</label>

              <select {...register("city")}>
                <option value="">აირჩიე ქალაქი</option>
                <option value="თბილისი">თბილისი</option>
                <option value="ბათუმი">ბათუმი</option>
                <option value="ქუთაისი">ქუთაისი</option>
                <option value="რუსთავი">რუსთავი</option>
              </select>

              {errors.city && (
                <span>{errors.city.message}</span>
              )}
            </div>

            <div className="checkout__field">
              <label>მისამართი</label>

              <textarea
                placeholder="შეიყვანე სრული მისამართი"
                rows="4"
                {...register("address")}
              />

              {errors.address && (
                <span>{errors.address.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="checkout__submit"
            >
              შეკვეთის დადასტურება
            </button>

          </form>

          <aside className="checkout__summary">

            <h2>შეკვეთის შეჯამება</h2>

            {cartItems.map((item) => (
              <div
                className="checkout__product"
                key={item.id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>

                  <p>
                    {item.quantity} × {item.price} ₾
                  </p>
                </div>
              </div>
            ))}

            <div className="checkout__total">
              <span>სულ</span>

              <strong>{totalPrice} ₾</strong>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Checkout;