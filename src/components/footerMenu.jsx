import React from 'react';
import { Link } from 'react-router-dom';

function FooterMenu(props) {
  return (
    <footer>
      <ul className="footer-menu">
        <li>
          <Link to="/">
            <i className="icon-home"></i>
          </Link>
        </li>
        <li>
          <Link to="/">
            <i className="icon-navigation"></i>
          </Link>
        </li>
        <li className="footer-upload">
          <Link as={Link} to="/uploadForm">
            <i className="icon-plus"></i>
          </Link>
        </li>
        <Link to="/chatList">
          <li
            onClick={() => {
              props.getChatList();
            }}
          >
            <i className="icon-chat2"></i>
          </li>
        </Link>
        <li>
          <Link as={Link} to="/userProfile">
            <i className="icon-user"></i>
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default FooterMenu;
