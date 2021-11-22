import { useEffect, useContext, createContext } from 'react';
import useWebSocket from 'react-use-websocket';
import { GlobalContext } from '../context/global.context';
import { setupSocketConnction, handleSocketMessages } from '../actions/global.actions';

//@info Create and export context
export const SocketContext = createContext();
//@info Create scoket provider
export const SocketProvider = ({ children }) => {
  const { dispatch } = useContext(GlobalContext);
  const host = window.location.origin.startsWith('https') ?  window.location.origin.replace(/^https/, 'wss') : window.location.origin.replace(/^https?/, 'ws');
  // 'ws://localhost:3001'
  const { sendMessage, lastMessage, readyState } = useWebSocket(host, {
    // Obsługa błędów
    onError: error => console.log(error),
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

  return <SocketContext.Provider value={sendMessage}>{children}</SocketContext.Provider>;
};
