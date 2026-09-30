import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__top">

          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              CasaHome
            </Link>

            <p className="footer__description">
              თანამედროვე და მყუდრო სახლისთვის შექმნილი სივრცე —
              აღმოაჩინე პროდუქტები, რომლებიც შენს სახლს განსაკუთრებულს გახდის.
            </p>

            <div
              className="footer__socials"
              aria-label="სოციალური ქსელები"
            >
              <a href="https://www.facebook.com/" aria-label="Facebook">
                f
              </a>

              <a href="https://www.instagram.com/" aria-label="Instagram">
                ◎
              </a>

              <a href="https://www.pinterest.com/" aria-label="Pinterest">
                p
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer__column">
            <h3>ნავიგაცია</h3>

            <nav className="footer__links">
              <Link to="/">
                მთავარი
              </Link>

              <Link to="/products">
                პროდუქტები
              </Link>

              <Link to="/categories">
                კატეგორიები
              </Link>

              <Link to="/about">
                ჩვენ შესახებ
              </Link>
            </nav>
          </div>

          {/* Help */}
          <div className="footer__column">
            <h3>დახმარება</h3>

            <nav className="footer__links">
              <Link to="/contact">
                კონტაქტი
              </Link>

              <Link to="/cart">
                კალათა
              </Link>

              <Link to="/favorites">
                რჩეულები
              </Link>

              <Link to="/login">
                შესვლა
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__column footer__contact">
            <h3>დაგვიკავშირდი</h3>

            <a href="mailto:info@casahome.ge">
              info@casahome.ge
            </a>

            <a href="tel:+995555123456">
              +995 555 12 34 56
            </a>

            <p>
              თბილისი, საქართველო
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer__bottom">

          <p>
            © {currentYear} CasaHome. ყველა უფლება დაცულია.
          </p>

          <div className="footer__bottom-links">
            <Link to="/about">
              ჩვენ შესახებ
            </Link>

            <Link to="/contact">
              კონტაქტი
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;