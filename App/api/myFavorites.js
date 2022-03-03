import client from './clinet';

const getMyFavorites = (q) => client.get('/favorites', q);
const getMyFavoritesListByCategory = ({ moduleID, query }) =>
  client.get(`/favorites/${moduleID}`, query);

export default {
  getMyFavorites,
  getMyFavoritesListByCategory,
};
