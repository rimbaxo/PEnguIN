import axios from 'axios';
import Constants from 'expo-constants';

import { locStorage, encodeFormData } from '@/utils';

export const authApi = axios.create({
  baseURL: `${Constants.manifest?.extra?.baseUrl}/keycloak/auth/realms/tyk/protocol/openid-connect/`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${Constants.manifest?.extra?.clientCredentials}`,
  },
});

export const refreshAccessTokenFn = async (refresh_token) => {
  const data = {
    grant_type: 'refresh_token',
    refresh_token,
  };
  const form = encodeFormData(data);

  const response = await authApi.post('token', form);
  await locStorage.setItem('token', response.data);
  return Promise.resolve(response.data);
};

export const loginUserFn = async (credentials) => {
  const { username, password } = credentials;
  const data = {
    username,
    password,
    grant_type: 'password',
    redirect_uri: 'http://localhost:3000/auth',
  };
  const form = encodeFormData(data);

  const response = await authApi.post('token', form);
  await locStorage.setItem('token', response.data);
  return response.data;
};

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log({ error });
    const errMessage = error.response.data.error_description;
    if (errMessage.includes('Invalid refresh token')) {
      await locStorage.removeItem('token');
      return error;
    }
    return Promise.reject(error);
  }
);
