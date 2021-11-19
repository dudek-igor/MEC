import { useEffect, useContext, createContext } from 'react';
import useWebSocket from 'react-use-websocket';
import { GlobalContext } from '../context/global.context';
import { setupSocketConnction, handleSocketMessages } from '../actions/global.actions';
// import useWebSocket, { ReadyState } from 'react-use-websocket';

// // Create context
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { dispatch } = useContext(GlobalContext);

  //   'ws://shielded-escarpment-64139.herokuapp.com:8080'
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8080', {
    // Shuld i update data on reconnect!
    shouldReconnect: closeEvent => {
      return true;
    },
  });
  //@info useEffect for check socket state
  useEffect(() => {
    //@info Setup Socket Connection
    setupSocketConnction(dispatch, readyState);
  }, [dispatch, readyState]);

  useEffect(() => {
    //@info Handle Socket Messages
    handleSocketMessages(dispatch, lastMessage);
  }, [dispatch, lastMessage]);

  // const handleClickSendMessage = useCallback(() => sendMessage('Hello'), [sendMessage]);

  return (
    <>
     <SocketContext.Provider value={sendMessage}>{children}</SocketContext.Provider>
      {/* <div>
        <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
          Click Me to send 'Hello'
        </button>
        {/* <span>The WebSocket is currently {connectionStatus}</span> */}
        {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null} */}
        {/* <ul>
          {messageHistory.map((message, idx) => (
            <span key={idx}>{message ? message.data : null}</span>
          ))}
        </ul> */}
      {/* </div> */} 
    </>
  );
};
