import client from './clinet';

const getToursCategories = (q) => client.get('/tours');
const getToursListByCategory = (q) => client.get('/tours-search', q);
const getTourDetails = (id) => client.get(`/tours/${id}`);
const doTourReservation = (data) => client.post(`/tour-reservation`, data);

export default {
  getToursListByCategory,
  getToursCategories,
  getTourDetails,
  doTourReservation,
};
