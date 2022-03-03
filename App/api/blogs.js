import client from './clinet';

const getBlogs = (q) => client.get('/blogs', q);

const getBlogDetails = (id) => client.get(`/blog/${id}`);

export default {
  getBlogs,
  getBlogDetails,
};
