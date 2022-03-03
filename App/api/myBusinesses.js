import client from './clinet';

const getMyBusinessList = () => client.get('/my-corporations');

const updateBusiness = (params) =>
  client.post('/my-corporation-status', params);

export default {
  getMyBusinessList,
  updateBusiness,
};
