import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ChatRoom(props) {
  let { id } = useParams();
  const chatData = props.chatList.find((chat) => chat.id === id);

  const opponentImg = {
    backgroundImage: `url(${chatData && chatData.img})`,
  };
  let chatMessages = props.chatMessages;
  console.log(chatMessages);
  let zero;
  let PMAM;

  const lastLi = document.querySelector('.chatting li:last-child');

  useEffect(() => {
    lastLi.scrollIntoView({ block: 'start' });
  }, [chatMessages]);
  return (
    <section className="chatting-room">
      <ul className="chatting">
        {chatMessages.map((chat) => (
          <li
            className={
              'chat-box' + (chat.uid === props.user.uid ? ' mine' : ' opponent')
            }
            key={chat.id}
          >
            <span className="chat-box-time">
              {
                (chat.time[3] < 12 ? (PMAM = '오전') : (PMAM = '오후'),
                chat.time[4] < 10 ? (zero = '0') : (zero = 0),
                PMAM + ' ' + chat.time[3] + ':' + zero + chat.time[4])
              }
            </span>
            <span className="chat-box-text">{chat.content}</span>
          </li>
        ))}

        <li className="chat-box opponent">
          <span className="chat-box-time">2시41분</span>
          <span className="chat-box-text">네 안녕하세요</span>
          <div className="chat-box-userimg" style={opponentImg}></div>
        </li>
      </ul>

      <form className="chatting-form" onSubmit={props.createChatMessages}>
        <input
          type="text"
          name="chat-form-text"
          onChange={props.onMessageChange}
          autoFocus
          placeholder="메세지를 입력하세요"
        />
        <button>
          <i className="icon-send"></i>
        </button>
      </form>
    </section>
  );
}

export default ChatRoom;
