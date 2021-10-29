import React from 'react';
import Chat from './chat';
import { Route } from 'react-router-dom';

function ChatList(props) {
  return (
    <ul className="chat-list-box">
      {props.chatList.map((chat) => (
        <Route path="/chat:id" component={Chat}>
          <Chat
            key={chat.id}
            chat={chat}
            getChatMessages={props.getChatMessages}
          />
        </Route>
      ))}
    </ul>
  );
}

export default ChatList;
