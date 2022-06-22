import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Detail(props) {
  const [detail, setDetail] = useState();
  const { state: selfLink } = useLocation();

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

  function fetch(link) {
    return axios.get(link);
  }

  function handleClick() {
    window.open(detail && detail.data.recipe.url);
  }

  return (
    <div className="main">
      <div className="container pt-5">
        <h1 className="py-5 text-center">
          {detail && detail.data.recipe.label}
        </h1>
        <div className="info-section row align-items-center justify-content-center">
          <div className="info-image col-6 col-md-4">
            <img
              className="img-thumbnail image-fluid"
              src={detail && detail.data.recipe.image}
              alt={detail && detail.data.recipe.label}
            />
          </div>
          <div className="info-content col-6 col-md-4">
            <ul>
              <li>Cuisine Type: {detail && detail.data.recipe.cuisineType}</li>
              <li>Meal Type: {detail && detail.data.recipe.mealType}</li>
              <li>Dish Type: {detail && detail.data.recipe.dishType}</li>
            </ul>
          </div>
        </div>

        <div className="row ingredients-section mt-5 justify-content-center">
          <div className="col-md-8">
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
            className=" detail-button col-3 col-md-2 ms-auto mb-5"
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
