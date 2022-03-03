import { create } from 'apisauce';
import authStorage from '../auth/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'https://api.visitbodrum.4alabs.com';

const apiClient = create({
  baseURL: API_URL,
  proxy: false,
});

apiClient.addAsyncRequestTransform(async (request) => {
  request.headers['Content-Type'] = 'application/json';
  const lang = await AsyncStorage.getItem('lang');
  request.headers['X-LOCALE'] = lang;

  var token = null;

  await authStorage.getToken().then(
    (res) => {
      token = res;
    },
    (err) => {
      console.log('no Token');
    },
  );
  if (!token) return;
  request.headers['X-API-TOKEN'] = token;
});

export default apiClient;
