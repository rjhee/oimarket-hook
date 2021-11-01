import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function ChatRoom(props) {
  let { id } = useParams();
  const chatData = props.chatList.find((chat) => chat.id === id);

  const opponentImg = {
    backgroundImage: `url(${chatData && chatData.img})`,
  };
  let chatMessage = props.chatMessages;
  console.log(chatMessage);
  let zero;
  let PMAM;

  const lastLi = document.querySelector('.chatting li:last-child');

  useEffect(() => {
    lastLi && lastLi.scrollIntoView({ block: 'start' });
  }, [lastLi]);
  return (
    <section className="chatting-room">
      <ul className="chatting">
        {chatMessage.map((chat) => (
          <li
            className={
              'chat-box' + (chat.uid === props.user.uid ? ' mine' : ' opponent')
            }
            key={chat.id}
          >
            <span className="chat-box-time">
              {
                (chat.time[3] < 12 ? (PMAM = '오전') : (PMAM = '오후'),
                chat.time[4] < 10 ? (zero = '0') : (zero = ''),
                PMAM +
                  ' ' +
                  (chat.time[3] > 12 ? chat.time[3] - 12 : chat.time[3]) +
                  ':' +
                  zero +
                  chat.time[4])
              }
            </span>
            <div className="chat-box-cover">
              {chat.uid === props.user.uid ? null : (
                <span className="chat-box-name">{chat.name}</span>
              )}
              <span className="chat-box-text">{chat.content}</span>
            </div>
            {chat.uid === props.user.uid ? null : (
              <span className="chat-box-userimg" style={opponentImg}></span>
            )}
          </li>
        ))}
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
