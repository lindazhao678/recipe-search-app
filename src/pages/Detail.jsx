import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetch } from "../services/recipeServices";

function Detail(props) {
  const [detail, setDetail] = useState();
  const { state: selfLink } = useLocation();
  console.log(selfLink);

  useEffect(() => {
    async function getDetail() {
      try {
        const response = await fetch(selfLink);
        setDetail(response);
      } catch (error) {
        console.log(error);
      }
    }
    getDetail();
  }, []);

  function handleClick() {
    window.location = detail && detail.data.recipe.url;
  }

  return (
    <div className="detail-page">
      <div className="content-container">
        <h1 className="p-5 text-center">
          {detail && detail.data.recipe.label}
        </h1>
        <div className="info-section row align-items-center justify-content-center">
          <div className="col-4">
            <img
              className="info-image img-thumbnail "
              src={detail && detail.data.recipe.image}
              alt={detail && detail.data.recipe.label}
            />
          </div>
          <div className="info-Content col-4">
            <ul className="list-unstyled">
              <li>Cuisine Type: {detail && detail.data.recipe.cuisineType}</li>
              <li>Meal Type: {detail && detail.data.recipe.mealType}</li>
              <li>Dish Type: {detail && detail.data.recipe.dishType}</li>
            </ul>
          </div>
        </div>

        <div className="row ingredients-section mt-5 justify-content-center">
          <div className="col-8">
            <h2>Ingredients:</h2>
            <ul>
              {detail &&
                detail.data.recipe.ingredientLines.map((item) => (
                  <li>{item}</li>
                ))}
            </ul>
          </div>
        </div>
        
        <div className="row">
          <button
            className="btn btn-danger col-2 ms-auto mb-4"
            onClick={handleClick}
          >
            Recipe {">>"}
          </button>
          <div className="col-2"></div>
        </div>

        
      </div>
    </div>
  );
}

export default Detail;
