import React from 'react';
import Chat from './chat';

function ChatList(props) {
  return (
    <ul className="chat-list-box">
      {props.chatList.map((chat) => (
        <Chat key={chat.id} chat={chat} />
      ))}
    </ul>
  );
}

export default ChatList;
