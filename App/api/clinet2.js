import { create } from 'apisauce';
import authStorage from '../auth/storage';

const apiClient = create({
  baseURL: 'https://visitbodrum.4alabs.com/',
  proxy: false,
});

apiClient.addAsyncRequestTransform(async (request) => {
  request.headers['Content-Type'] = 'application/json';
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
  request.headers['Authorization'] = 'Bearer ' + token;
});

export default apiClient;
