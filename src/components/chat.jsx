import React from 'react';
import { useHistory, useParams } from 'react-router';

const Chat = (props) => {
  let history = useHistory();
  let { id } = useParams();

  const month = props.chat.time[1];
  const day = props.chat.time[2];
  const hours = props.chat.time[3];
  const minutes = props.chat.time[4];

  let chatDate = `${month + 1}월${day}일 ${hours}시${minutes}분`;

  const productImg = {
    backgroundImage: `url(${props.chat.img})`,
  };

  return (
    <li
      className="chat-list"
      onClick={() => {
        history.push('/chatroom/' + props.chat.id);
        props.getChatMessages(10);
      }}
    >
      <div className="chat-list-opponent-img"></div>
      <div className="chat-list-contents">
        <div className="chat-list-info">
          <span className="chat-list-opponent-name">{props.chat.name[1]}</span>
          <span className="chat-list-time">{chatDate}</span>
        </div>
        <span className="chat-list-text">{props.chat.product}</span>
      </div>
      <div className="chat-list-product-img" style={productImg}></div>
    </li>
  );
};

export default Chat;
