import React from "react";
import { useLocation } from 'react-router-dom';

function Header() {

  const location = useLocation().pathname;

  return (
    <div className="navbar">
      <div className="nav container">
        <div className="logo">
          <a href="/"><img src="assets/logo.png" alt="logo"/></a>
        </div>
        <ul>
          <li><a className={location==='/'&&'active'} href="/">Home</a></li>         
          <li><a className={location==='/recipes'&&'active'} href="/recipes">Recipes</a></li>
          <li><a className={location==='/favorites'&&'active'} href="/favorites">Favorites</a></li>
          <li><a className={location==='/contact'&&'active'} href="/contact">Contact</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
