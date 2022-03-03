import client from './clinet';

const getHotelsListByCategory = (q) => client.get('/hotels-by-categories', q);
const getHotelsCategories = (q) => client.get('/hotels');
const getHotelsByDistance = (q) => client.get('/hotels-by-distance', q);
const getHotelDetails = (id) => client.get(`/hotels/${id}`);
const getHotelRooms = (q) => client.get(`/hotel-rooms`, q);
const doHotelReservation = (data) => client.post(`/hotels-reservation`, data);

export default {
  getHotelsListByCategory,
  getHotelsCategories,
  getHotelsByDistance,
  getHotelDetails,
  doHotelReservation,
  getHotelRooms,
};
