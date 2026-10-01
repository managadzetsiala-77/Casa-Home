
import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Heart,
  ShoppingCart,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";

import "./Header.scss";

function Header() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isDark, toggleTheme } = useThemeStore();
  const { isLoggedIn, currentUser, logout } = useUserStore();

  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const favoriteCount = favoriteItems.length;

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          Casa<span>Home</span>
        </Link>

        <div className="header__actions">
          <Link
            to="/favorites"
            className="header__action"
            aria-label="რჩეულები"
            onClick={closeMenu}
          >
            <Heart size={21} strokeWidth={1.8} />

            {favoriteCount > 0 && (
              <b className="header__badge">{favoriteCount}</b>
            )}
          </Link>

          <Link
            to="/cart"
            className="header__action"
            aria-label="კალათა"
            onClick={closeMenu}
          >
            <ShoppingCart size={21} strokeWidth={1.8} />

            {cartCount > 0 && (
              <b className="header__badge">{cartCount}</b>
            )}
          </Link>

          <button
            className="theme-button"
            onClick={toggleTheme}
            aria-label="თემის შეცვლა"
            type="button"
          >
            {isDark ? <Sun size={21} /> : <Moon size={21} />}
          </button>

          <button
            className="header__menu-button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "მენიუს დახურვა" : "მენიუს გახსნა"}
            aria-expanded={isMenuOpen}
            type="button"
          >
            {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        <div className={`header__menu ${isMenuOpen ? "header__menu--open" : ""}`}>
          <nav className="header__nav">
            <NavLink to="/" end onClick={closeMenu}>
              მთავარი
            </NavLink>

            <NavLink to="/products" onClick={closeMenu}>
              პროდუქტები
            </NavLink>

            <NavLink to="/categories" onClick={closeMenu}>
              კატეგორიები
            </NavLink>

            <NavLink to="/about" onClick={closeMenu}>
              ჩვენ შესახებ
            </NavLink>

            <NavLink to="/contact" onClick={closeMenu}>
              კონტაქტი
            </NavLink>
          </nav>

          <div className="header__auth">
            {isLoggedIn ? (
              <>
                <span className="header__user">
                  გამარჯობა, {currentUser?.name}
                </span>

                <button
                  className="header__logout"
                  onClick={handleLogout}
                  type="button"
                >
                  გასვლა
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="header__login"
                  onClick={closeMenu}
                >
                  შესვლა
                </Link>

                <Link
                  to="/register"
                  className="header__register"
                  onClick={closeMenu}
                >
                  რეგისტრაცია
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;