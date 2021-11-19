// import React, { createContext, useReducer, useState, useCallback, useEffect } from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';

// // Create context
// export const SocketContext = createContext();

// //Provider Component
// export const SocketProvider = ({ children }) => {
//   const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
//   const [messageHistory, setMessageHistory] = useState([]);

//   const {
//     sendMessage,
//     lastMessage,
//     readyState,
//   } = useWebSocket();


//   const socket = '';
//   //   const socket = io();
//   return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
// };

import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const SocketProvider = ({children}) => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
  const [messageHistory, setMessageHistory] = useState([]);
//   'ws://shielded-escarpment-64139.herokuapp.com:8080'
  const {
    sendMessage,
    lastMessage,
    readyState,
  } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(() =>
    setSocketUrl('wss://demos.kaazing.com/echo'), []);

  const handleClickSendMessage = useCallback(() =>
    sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <>
    {children}
    <div>
      <button
        onClick={handleClickChangeSocketUrl}
      >
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory
          .map((message, idx) => <span key={idx}>{message ? message.data : null}</span>)}
      </ul>
    </div>
    
    </>
  );
};
