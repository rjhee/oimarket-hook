import React from 'react';

const Chat = () => {
  return (
    <section className="chatting-room">
      <ul className="chatting">
        <li className="chat-box mine">
          <span className="chat-box-time">2시40분</span>
          <span className="chat-box-text">안녕하세요</span>
          <div className="chat-box-userimg"></div>
        </li>
        <li className="chat-box opponent">
          <span className="chat-box-time">2시41분</span>
          <span className="chat-box-text">네 안녕하세요</span>
          <div className="chat-box-userimg"></div>
        </li>
      </ul>
      <form className="chatting-form">
        <input
          type="text"
          name="chat-form-text"
          placeholder="메세지를 입력하세요"
        />
        <button>
          <i className="icon-send"></i>
        </button>
      </form>
    </section>
  );
};

export default Chat;
