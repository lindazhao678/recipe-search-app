import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowDown, FaSearch} from "react-icons/fa";
import {RiHeartAddFill } from "react-icons/ri";
import {MdCoffeeMaker } from "react-icons/md";


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
      <div className="container">
        <div className="hero-content">
          <div className="hero-content-top mb-3">
            <h3>Don't know how to perpare your meal?</h3>
          </div>
          <div className="hero-content-bottom">
            <h5><FaSearch /><span className="ps-3">Search the recipes!</span></h5>
            <h5><RiHeartAddFill /><span className="ps-3">Add to favorits!</span></h5>
            <h5><MdCoffeeMaker /><span className="ps-3">And do it!</span></h5>
          </div>
        </div>

        <div className="down-arrow bounce py-3">
          <FaArrowDown />
        </div>
        <div className="search-section">
          <h1>YOUR MEAL, YOUR CALL</h1>
          <input
            type="text"
            className="form-control"
            id="search-input"
            placeholder="Search and Enter..."
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
