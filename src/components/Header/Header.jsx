import { Link } from "react-router-dom";

import "./Header.scss";

function Header() {
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

          <Link
            to="/login"
            className="header__login"
          >
            შესვლა
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Header;