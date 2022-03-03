import client from './clinet';

const updateBusinessInfo = (params) =>
  client.post(`/corporation-profile`, params);
const getBusinessInfo = () => client.get('/corporation-profile');
const getTownList = () => client.get('/town');

export default {
  getBusinessInfo,
  updateBusinessInfo,
  getTownList,
};
