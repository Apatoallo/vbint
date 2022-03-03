import client from './clinet';

const doLogin = (userData) => client.post('/login', userData);
const doSocialLogin = (userData) => client.post('/social-login', userData);

export default {
  doLogin,
  doSocialLogin,
};
