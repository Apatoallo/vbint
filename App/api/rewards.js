import client from './clinet';

const getRewardsList = (q) => client.get('/rewards', q);
const doApply = (data) =>
  client.post(`/rewards-join`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export default {
  getRewardsList,
  doApply,
};
