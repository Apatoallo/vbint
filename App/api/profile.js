import client from './clinet';

const updateImage = (data) =>
  client.post(`/profile-image`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const getTravelPlans = (id) => client.get(`/my-travel-plan`);
const getTravelPlansWeek = (id) => client.get(`/my-travel-plan-week`);
const getTravelPlansCategories = (id) => client.get(`/travel-plan-categories`);
const getTravelPlansItem = (id) => client.get(`/travel-plan-categories/${id}`);
const addTravelPlan = (data) => client.post(`/travel-plan`, data);
const deleteTravelPlan = (id) => client.get(`/delete-travel-plan/${id}`);
const getComments = (id) => client.get(`/my-comments`);
const getProfile = (id) => client.get(`/me`);
const updateToken = (data) => client.post(`/profile-fcm-token`, data);
const updateProfile = (q) => client.post(`/update-me`, q);
const updateCorporationProfile = (q) => client.post(`/corporation-profile`, q);

export default {
  updateImage,
  getTravelPlans,
  getTravelPlansCategories,
  getTravelPlansItem,
  addTravelPlan,
  getComments,
  updateToken,
  deleteTravelPlan,
  getProfile,
  updateProfile,
  getTravelPlansWeek,
  updateCorporationProfile,
};
