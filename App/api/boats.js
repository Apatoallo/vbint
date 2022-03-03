import client from './clinet';

const getBoatsList = (q) => client.get('/boats', q);
const getBoatDetails = (id) => client.get(`/boats/${id}`);

export default {
  getBoatsList,
  getBoatDetails,
};
