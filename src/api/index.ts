import * as authApi from './authApi';
import * as chatApi from './chatApi';
import * as userApi from './userApi';

export const api = {
  auth: authApi,
  user: userApi,
  chat: chatApi,
};
