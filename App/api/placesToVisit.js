import client from './clinet';

const getPlacesToVisitList = (q) => client.get('/places', q);

const getPlaceDetail = (placeID) => client.get(`place/${placeID}`);

export default {
  getPlacesToVisitList,
  getPlaceDetail,
};
