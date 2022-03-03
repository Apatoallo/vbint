import client from './clinet';

const getActivitiesListByCategory = (q) =>
  client.get('/activities-by-categories', q);
const getActivitiesCategories = (q) => client.get('/activities');
const getActivitiesByDistance = (q) => client.get('/activities-by-distance', q);
const getActivityDetails = (id) => client.get(`/activity/${id}`);
const getActivityCategories = () => client.get(`/activities-suggest`);
const addActivitySuggest = (q) => client.post(`/activities-suggest`, q);

export default {
  getActivitiesListByCategory,
  getActivitiesCategories,
  getActivitiesByDistance,
  getActivityDetails,
  getActivityCategories,
  addActivitySuggest,
};
