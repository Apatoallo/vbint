import client from './clinet';

const addMemory = (data) => client.post(`/memorybooks`, data);
const updateMemory = (data) => client.post(`/memorybooks`, data);
const getMemoryList = () => client.get('/memorybooks');
const getMemoryListByCategory = ({ moduleID, query }) =>
  client.get(`/memorybooks/${moduleID}`, query);

export default {
  addMemory,
  updateMemory,
  getMemoryList,
  getMemoryListByCategory,
};
