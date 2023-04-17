// import { useState, useEffect } from 'react';

import ChatView from '@/components/ChatView';
// import { BASE_URL, CHAT_PORT } from 'react-native-dotenv';
// import { io } from 'socket.io-client';

//import ChatMessage from '@/components/ChatMessage';

const Chat = () => {
  const chatId = '62a1fd0ec694040026876330-62a1fd0ec694040026876asd0'; // id_utente-id_terapista
  /*  Roba di socket.io
 const [connected, setConnected] = useState(false);
  console.log({ connected });

  const chatid = '62a1fd0ec694040026876330-62a1fd0ec694040026876330'; // id_utente-id_terapista
  const socket = io(`${BASE_URL}:${CHAT_PORT}/chats/` + chatid, {
    query: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTFmZDBlYzY5NDA0MDAyNjg3NjMzMCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjU1MjExMjkwLCJleHAiOjE2NTUyNDcyOTB9.qy6wJ_GIiXnKAqqxxR88cibaHoglTze7WIRh7swJTmM', // ci pensa David
    },
  });

  socket.on('connect', () => {
    setConnected(true);
  });
  socket.on('disconnect', () => {
    setConnected(false);
  });

  socket.on('connect_error', (error) => {
    console.log(error);
  });

  useEffect(() => {
    return () => {
      socket.io.reconnection(false); // disable automatic reconnection on unmount
      socket.disconnect(); // close the connection
    };
  }, []); */

  return <ChatView chatId={chatId} />;
};

export default Chat;
