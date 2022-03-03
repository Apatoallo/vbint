import client from './clinet';

const getCafesListByCategory = (q) => client.get('/cafes-category', q);
const getCafesCategories = (q) => client.get('/cafes');
const getCafesByDistance = (q) => client.get('/cafes-by-distance', q);
const getCafeDetails = (id) => client.get(`/cafe/${id}`);

const doCafeReservation = (data) => client.post(`/cafe-reservation`, data);

export default {
  getCafesListByCategory,
  getCafesCategories,
  getCafesByDistance,
  getCafeDetails,
  doCafeReservation,
};
