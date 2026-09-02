import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Header.scss";



function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const cartItems = useSelector((state) => state.cart.items);

  const favoriteItems = useSelector((state) => state.favorites.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const favoriteCount = favoriteItems.length;

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  
    setIsLoggedIn(false);
  
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container">

        <Link to="/" className="header__logo">
          CasaHome
        </Link>

        <nav className="header__nav">
          <Link to="/">მთავარი</Link>

          <Link to="/products">
            პროდუქტები
          </Link>

          <Link to="/categories">
            კატეგორიები
          </Link>

          <Link to="/about">
            ჩვენ შესახებ
          </Link>

          <Link to="/contact">
            კონტაქტი
          </Link>
        </nav>

 

        <div className="header__actions">

        <Link to="/favorites" className="header__action">
  ♡
  
  {favoriteCount > 0 && (
    <b className="header__badge">{favoriteCount}</b>
  )}
</Link>

        <Link to="/cart" className="header__action">
  🛒
 
  {cartCount > 0 && (
    <b className="header__badge">{cartCount}</b>
  )}
</Link>


          <button className="header__icon">
            🌙
          </button>

        </div>

        <div className="header__auth">

{isLoggedIn ? (
  <>
    <span className="header__user">
      გამარჯობა, {currentUser?.name}
    </span>

    <button
      className="header__logout"
      onClick={handleLogout}
    >
      გასვლა
    </button>
  </>
) : (
  <>
    <Link
      to="/login"
      className="header__login"
    >
      შესვლა
    </Link>

    <Link
      to="/register"
      className="header__register"
    >
      რეგისტრაცია
    </Link>
  </>
)}

</div>

      </div>
    </header>
  );
}

export default Header;