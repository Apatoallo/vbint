import client from './clinet';

const getHomePage = () => client.get('/home');
const getUserData = (q) => client.post('/status-control', q);

export default {
  getHomePage,
  getUserData,
};
