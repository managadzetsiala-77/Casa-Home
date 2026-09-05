import { Link } from "react-router-dom";
import "./About.scss";

function About() {
  return (
    <main className="about">
      <section className="about__hero">
        <span>CASAHOME</span>

        <h1>შექმენი სივრცე, სადაც თავს სახლში გრძნობ</h1>

        <p>
          CasaHome აერთიანებს თანამედროვე დიზაინს,
          კომფორტსა და ხარისხს, რათა შენი სახლი
          განსაკუთრებულ სივრცედ აქციოს.
        </p>
      </section>

      <section className="about__story">
        <div className="about__text">
          <span>ჩვენს შესახებ</span>

          <h2>სახლი იწყება სწორი არჩევანით</h2>

          <p>
            CasaHome შეიქმნა მათთვის, ვისაც სურს
            თანამედროვე, კომფორტული და გამორჩეული
            ინტერიერი.
          </p>

          <p>
            ჩვენი კოლექცია მოიცავს ავეჯს და დეკორის
            ნივთებს, რომლებიც ერთმანეთთან მარტივად
            ეწყობა და ქმნის ჰარმონიულ გარემოს.
          </p>

          <Link to="/products">
            კოლექციის ნახვა →
          </Link>
        </div>

        <div className="about__image">
          <div>CasaHome</div>
        </div>
      </section>

      <section className="about__values">
        <div className="about__values-header">
          <span>რატომ CasaHome?</span>

          <h2>ჩვენი მთავარი ღირებულებები</h2>
        </div>

        <div className="about__cards">

          <article>
            <span>01</span>
            <h3>ხარისხი</h3>
            <p>
              ვირჩევთ ხარისხიან და გამძლე პროდუქტებს,
              რომლებიც დიდხანს მოგემსახურება.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>თანამედროვე დიზაინი</h3>
            <p>
              ჩვენი პროდუქცია შექმნილია თანამედროვე
              ინტერიერისთვის.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>კომფორტი</h3>
            <p>
              ჩვენთვის მნიშვნელოვანია, რომ ლამაზი
              დიზაინი კომფორტსაც აერთიანებდეს.
            </p>
          </article>

        </div>
      </section>

      <section className="about__cta">
        <h2>იპოვე შენი სივრცისთვის იდეალური ნივთი</h2>

        <Link to="/products">
          პროდუქტების ნახვა
        </Link>
      </section>
    </main>
  );
}

export default About;