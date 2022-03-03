import client from './clinet';

const getCampaigns = (q) => client.get('/campaigns', q);

export default {
  getCampaigns,
};
