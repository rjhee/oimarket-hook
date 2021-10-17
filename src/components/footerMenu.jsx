import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function FooterMenu() {
  return (
    <footer>
      <ul className="footer-menu">
        <li>
          <Link to="/productList">
            <i className="icon-home"></i>
          </Link>
        </li>
        <li>
          <Link>
            <i className="icon-navigation"></i>
          </Link>
        </li>
        <li className="footer-upload">
          <Link as={Link} to="/uploadForm">
            <i className="icon-plus"></i>
          </Link>
        </li>
        <li>
          <Link>
            <i className="icon-chat2"></i>
          </Link>
        </li>
        <li>
          <Link to="/userProfile">
            <i className="icon-user"></i>
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default FooterMenu;
