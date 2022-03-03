import client from './clinet';

const getTransfersList = (q) => client.get('/vip-transfers', q);
const getTransfersDetails = (id) => client.get(`/vip-transfers/${id}`);

export default {
  getTransfersList,
  getTransfersDetails,
};
