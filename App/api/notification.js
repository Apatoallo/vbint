import client from './clinet';

const getNotificationList = () => client.get('/notifications');

const getCorporationNotificationList = () =>
  client.get('/corporation-notifications');

export default {
  getNotificationList,
  getCorporationNotificationList,
};
