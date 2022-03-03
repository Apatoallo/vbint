import client from './clinet';

const doReservations = (data) => client.post(`/reservations`, data);
export default {
  doReservations,
};
