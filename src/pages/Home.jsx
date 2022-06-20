import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";

function Home(props) {
  const navigate = useNavigate();
  const { query, getQuery } = props;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();
      navigate("/Recipes", { state: e.target.value });
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="hero-content">
          <div className="hero-content-top">
            <h3>Don't know how to perpare your meal?</h3>
          </div>
          <div className="hero-content-bottom">
            <h4>Search the recipes!</h4>
            <h4>Add to favorits!</h4>
            <h4>And do it!</h4>
          </div>
        </div>

        <div className="down-arrow bounce">
          <FaArrowDown />
        </div>
        <div className="search-section">
          <h1>YOUR MEAL, YOUR CALL</h1>
          <input
            type="text"
            className="form-control"
            id="search-input"
            placeholder="Search..."
            Value={query}
            onKeyDown={handleKeyDown}
          />
          <div className="hero-slogan">
            <h5>Never too late to treat yourself some yummies!</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
