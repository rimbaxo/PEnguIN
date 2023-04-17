import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useStateContext } from '@/context';

type IToken = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  scope: string;
  token_type: string;
};

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<Error | boolean>(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<IToken | null>(null);
  const [reload, setReload] = useState(false);

  const { state } = useStateContext();
  const { authUser } = state;
  const chatId = `${authUser.id}-${authUser.therapistId}`;

  const queryClient = useQueryClient();

  const getToken = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('token');
      const token: IToken = jsonValue != null ? JSON.parse(jsonValue) : null;
      setToken(token);
      setReload(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [reload]);

  useEffect(() => {
    if (token) {
      const socket = io(`http://149.132.178.120:3000/chats/${chatId}`, {
        query: {
          token: token.access_token,
        },
      });
      setSocket(socket);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        console.log('disconnect');
        setConnected(false);
      });
      socket.on('connect_error', (error) => {
        console.log(error);
        setError(error);
      });
      socket.on('connect', () => {
        console.log('connect');
        setConnected(true);
        setError(false);
      });
      socket.on('chat message', (_msg) => {
        console.log('received');
        queryClient.invalidateQueries(['chat']);
      });
    }
  }, [socket]);

  const refreshSocket = () => {
    setReload(true);
  };

  return { socket, connected, error, loading, refreshSocket };
};

export default useSocket;
