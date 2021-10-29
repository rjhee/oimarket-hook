import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ChatRoom(props) {
  let { id } = useParams();
  const chatData = props.chatList.find((chat) => chat.id === id);

  const opponentImg = {
    backgroundImage: `url(${chatData && chatData.img})`,
  };
  let chatMessages = props.chatMessages;
  const [init, setInit] = useState(true);
  console.log(chatMessages);

  useEffect(() => {
    return () => {
      setInit(false);
      console.log(init);
    };
  }, []);
  console.log(init);

  return (
    <section className="chatting-room">
      {init === true ? (
        <ul className="chatting">
          {chatMessages.map((chat) => (
            <li
              className={
                'chat-box' +
                (chat.uid === props.user.uid ? ' mine' : ' opponent')
              }
              key={chat.id}
            >
              <span className="chat-box-time">{chat.time}</span>
              <span className="chat-box-text">{chat.content}</span>
            </li>
          ))}

          <li className="chat-box opponent">
            <span className="chat-box-time">2시41분</span>
            <span className="chat-box-text">네 안녕하세요</span>
            <div className="chat-box-userimg" style={opponentImg}></div>
          </li>
        </ul>
      ) : null}
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
