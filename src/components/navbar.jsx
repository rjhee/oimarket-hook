import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/product">
        <h1 className="nav-logo">
          <i className="icon-cucumber"></i>
          <strong>오이마켓</strong>
        </h1>
      </Link>
      <div className="toggle-cover">
        <button className="nav-search">
          <i className="icon-search"></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
