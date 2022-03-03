import client from './clinet';

const getCancellationReasonList = () => client.get('/cancellation');

const cancelMembership = (params) => client.post('/cancellation', params);

const getCorporationCancellationReasonList = () =>
  client.get('/cancellation-corporation');

const cancelCorporationMembership = (params) =>
  client.post('/cancellation-corporation', params);

export default {
  getCancellationReasonList,
  cancelMembership,
  cancelCorporationMembership,
  getCorporationCancellationReasonList,
};
