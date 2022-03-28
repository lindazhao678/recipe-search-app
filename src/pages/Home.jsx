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
      <div className="hero-section container">
        <div className="hero-content">
          <div className="hero-content-left">
            <h2>Don't know how to perpare your meal?</h2>
          </div>
          <div className="hero-content-right">
            <h4>Search the recipes!</h4>
            <h4>Add to favorits!</h4>
            <h4>And do it!</h4>
          </div>
        </div>
        <h3 className="hero-slogan">Never too late to treat yourself some yummies!</h3>
        <div className="down-arrow bounce">
          <FaArrowDown />
        </div>
      </div>
      <div className="search-section container py-5">
        <h1>YOUR MEAL, YOUR CALL</h1>
          <input
            type="text"
            className="form-control"
            id="search-input"
            placeholder="Search..."
            Value={query}
            onKeyDown={handleKeyDown}
          />
      </div>
    </div>
  );
}

export default Home;
