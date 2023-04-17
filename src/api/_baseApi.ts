import axios from 'axios';
import Constants from 'expo-constants';
import { Cookies } from 'react-cookie';

import { refreshAccessTokenFn } from './authApi';

import { locStorage } from '@/utils';

const cookies = new Cookies();

const api = axios.create({
  baseURL: `${Constants.manifest?.extra?.baseUrl}/api/`,
});

api.interceptors.request.use(
  async (config) => {
    const token = await locStorage.getItem('token');
    if (!token) {
      return Promise.reject(new Error('User not logged in'));
    }
    const access_token = token.access_token;
    config.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.message === 'User not logged in') {
      cookies.remove('logged_in', { path: '/' });
      return Promise.reject(error);
    }
    const originalRequest = error.config;
    const errMessage = error.response.data.error;
    if (errMessage.includes('Key not authorised') && !originalRequest._retry) {
      const token = await locStorage.getItem('token');
      originalRequest._retry = true;
      await refreshAccessTokenFn(token.refresh_token);
      cookies.set('logged_in', true, { path: '/', maxAge: 1800 });
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
