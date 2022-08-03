import React, { useEffect, useState } from "react";
import Card from "../components/Card";

/**
 * A page to display favorites stored in user's localstorage.
 * User can also use this page to add/remove favorite.
 */
function Favorites(props) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  // retrieve favorites for the current user.
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

  return (
    <div className="main">
      <div className="container pt-5">
        <div className="row">
          {favorites &&
            favorites.map(favorite => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6 p-3">
                  <Card
                    selfLink={favorite.selfLink}
                    label={favorite.label}
                    image={favorite.image}
                  ></Card>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
