import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.scss";



function Header() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

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

          <Link
            to="/favorites"
            className="header__icon"
          >
            ♡
          </Link>

          <Link
            to="/cart"
            className="header__icon"
          >
            🛒
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