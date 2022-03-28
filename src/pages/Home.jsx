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
    <div className="main">
      <div id="hero-section">
        <div className="hero-content">
          <div className="content-left">
            <p>Don't know how to perpare your meal?</p>
          </div>
          <div className="content-right">
            <ul>
              <li>Search the recipes!</li>
              <li>Add to favorits!</li>
              <li>And do it!</li>
            </ul>
          </div>
        </div>
        <p className="slogan">Never too late to treat yourself some yummies!</p>
        <div className="down-arrow bounce">
          <FaArrowDown />
        </div>
      </div>
      <div className="search-section">
    
          <h1>YOUR MEAL, YOUR CALL</h1>
          <form className="home-search-input">
            <input
              type="text"
              className="form-control"
              id="search-input"
              placeholder="Search..."
              Value={query}
              onKeyDown={handleKeyDown}
            />
          </form>
      </div>
    </div>
  );
}

export default Home;
