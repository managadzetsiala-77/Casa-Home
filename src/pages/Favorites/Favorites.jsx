import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../../store/favoritesSlice";
import { Link } from "react-router-dom";
import "./Favorites.scss";

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state) => state.favorites.items,
  );

  return (
    <main className="favorites">
      <div className="favorites__container">
        <h1>რჩეულები</h1>

        {favorites.length === 0 ? (
          <div className="favorites__empty">
            <span>♡</span>
            <h2>რჩეულები ცარიელია</h2>
            <p>დაამატე სასურველი პროდუქტები რჩეულებში.</p>

            <Link to="/products">
              პროდუქტების ნახვა
            </Link>
          </div>
        ) : (
          <div className="favorites__grid">
            {favorites.map((item) => (
              <div className="favorites__card" key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                </Link>

                <h2>{item.name}</h2>

                <p>{item.price} ₾</p>

                <button
                  onClick={() =>
                    dispatch(removeFavorite(item.id))
                  }
                >
                  წაშლა
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Favorites;