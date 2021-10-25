import React from 'react';
import { Link } from 'react-router-dom';
import Chat from './chat';

const ChatList = () => {
  const opponentImg = {
    backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/oimarket-f7461.appspot.com/o/image%2Fprofile.png?alt=media&token=c1dc639a-5160-4665-90d6-509c7f809411)`,
  };
  return (
    <ul className="chat-list-box">
      <Link to="/chat">
        <li className="chat-list">
          <div className="chat-list-opponent-img" style={opponentImg}></div>
          <div className="chat-list-contents">
            <div className="chat-list-info">
              <span className="chat-list-opponent-name">김미미</span>
              <span className="chat-list-time">4월20일</span>
            </div>

            <span className="chat-list-text">안녕하십니까</span>
          </div>
          <div className="chat-list-product-img" style={opponentImg}></div>
        </li>
      </Link>
    </ul>
  );
};

export default ChatList;
