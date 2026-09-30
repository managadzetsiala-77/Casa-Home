import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();

  const { isDark, toggleTheme } = useThemeStore();

  const { isLoggedIn, currentUser, logout } = useUserStore();

  const cartItems = useSelector((state) => state.cart.items);

  const favoriteItems = useSelector((state) => state.favorites.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoriteCount = favoriteItems.length;

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          CasaHome
        </Link>

        <nav className="header__nav">
          <NavLink to="/" end>
            მთავარი
          </NavLink>

          <NavLink to="/products">პროდუქტები</NavLink>

          <NavLink to="/categories">კატეგორიები</NavLink>

          <NavLink to="/about">ჩვენ შესახებ</NavLink>

          <NavLink to="/contact">კონტაქტი</NavLink>
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
            {cartCount > 0 && <b className="header__badge">{cartCount}</b>}
          </Link>

          <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="თემის შეცვლა"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="header__auth">
          {isLoggedIn ? (
            <>
              <span className="header__user">
                გამარჯობა, {currentUser?.name}
              </span>

              <button className="header__logout" onClick={handleLogout}>
                გასვლა
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__login">
                შესვლა
              </Link>

              <Link to="/register" className="header__register">
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
