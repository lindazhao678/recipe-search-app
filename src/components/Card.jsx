import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { selfLink, label, image } = props;
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let favorites = getFavorites();
    if (contains(favorites)) {
      setLike(true);
    } else
    setLike(false);
  }, [selfLink]);

  function handleLike() {
    let favorites = getFavorites();
    if (contains(favorites)) {
      favorites = remove(favorites);
      setLike(false);
    } else {
      const newFavorite = {
        selfLink: selfLink,
        label: label,
        image: image,
      };
      favorites.push(newFavorite);
      setLike(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function contains(favorites) {
    return favorites.filter((i) => i.selfLink === selfLink).length > 0;
  }
  function remove(favorites) {
    return favorites.filter((i) => i.selfLink !== selfLink);
  }

  function getFavorites() {
    let favorites = localStorage.getItem("favorites");
    if (favorites) {
      return JSON.parse(favorites);
    } else {
      return [];
    }
  }

  function handleMore(){
    navigate('/detail', {state: selfLink})
  }
  
  return (
    <div className="card">
      <img className="card-img-top" src={image} alt={label} />
      <div className="card-body">
        <p className="card-title text-center">{label}</p>
        <div className="like-more-button-section">
          <button className="like-icon" onClick={handleLike}>
            <FontAwesomeIcon icon={faHeart} color={like ? "#ea580c" : "grey"} />
          </button>
          <button onClick={handleMore} type="button" className="more-button">
            More...
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
