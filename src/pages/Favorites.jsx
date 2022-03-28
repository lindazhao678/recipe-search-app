import React, { useEffect, useState } from "react";
import Card from "../components/Card";

function Favorites(props) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    function getFavorites() {
      try {
        let favorites = localStorage.getItem("favorites");
        if (favorites) {
          setFavorites(JSON.parse(favorites));
        } else {
          return [];
        }
      } catch (error) {
        console.log(error);
      }
    }
    getFavorites();
  }, []);

  return (
    <div className="favorites-page p-4">
      <div className="row">
        {favorites &&
          favorites.map((favorite) => {
            return (
              <div className="col-sm-3">
                <Card selfLink={favorite.selfLink}
                  label={favorite.label}
                  image={favorite.image}></Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Favorites;
