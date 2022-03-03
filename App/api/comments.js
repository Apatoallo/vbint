import client from './clinet';

const addComment = (data) => client.post(`/add-comment`, data);
export default {
  addComment,
};
