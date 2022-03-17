import React from "react";
import { useLocation } from 'react-router-dom';

function Header() {

  const location = useLocation().pathname;

  return (
    <div className="navbar">
      <nav>
        <div className="logo">
          <img src="assets/logo.png" alt="logo"/>
        </div>
        <ul>
          <li><a className={location==='/'&&'active'} href="/">Home</a></li>         
          <li><a className={location==='/recipes'&&'active'} href="/recipes">Recipes</a></li>
          <li><a className={location==='/favorites'&&'active'} href="/favorites">Favorites</a></li>
          <li><a className={location==='/contact'&&'active'} href="/contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
