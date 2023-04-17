import AsyncStorage from '@react-native-async-storage/async-storage';

interface Token {
  access_token: string;
  refresh_token: string;
}

export const locStorage = {
  setItem: async (key, value) => {
    try {
      if (value) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      Promise.reject(e);
    }
  },
  getItem: async (key): Promise<Token> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (e) {
      Promise.reject(e);
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      Promise.reject(e);
    }
  },
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      Promise.reject(e);
    }
  },
};

export const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};
