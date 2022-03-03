import client from './clinet';

const recordCall = (params) => client.post(`/call-logs`, params);

export default {
  recordCall,
};
