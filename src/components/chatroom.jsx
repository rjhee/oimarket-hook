import React from 'react';

function ChatRoom(props) {
  const opponentImg = {
    backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/oimarket-f7461.appspot.com/o/image%2Fprofile.png?alt=media&token=c1dc639a-5160-4665-90d6-509c7f809411)`,
  };
  return (
    <section className="chatting-room">
      <ul className="chatting">
        <li className="chat-box mine">
          <span className="chat-box-time">2시40분</span>
          <span className="chat-box-text">안녕하세요</span>
        </li>
        <li className="chat-box opponent">
          <span className="chat-box-time">2시41분</span>
          <span className="chat-box-text">네 안녕하세요</span>
          <div className="chat-box-userimg" style={opponentImg}></div>
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
}

export default ChatRoom;
