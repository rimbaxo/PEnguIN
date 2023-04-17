import api from './_baseApi';

export const getMeFn = async () => {
  const response = await api.get('users/me');
  return response.data;
};
