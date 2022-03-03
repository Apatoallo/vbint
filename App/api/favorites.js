import client from './clinet';

const addToFavorite = (moduleId, id) =>
  client.post(`/favorites`, { id: id, moduleId: moduleId });

const deleteFromFavorite = (moduleId, id) =>
  client.post(`/favorites`, { id: id, moduleId: moduleId });

export default {
  addToFavorite,
  deleteFromFavorite,
};
