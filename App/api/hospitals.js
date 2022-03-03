import client from './clinet';

const getHospitals = (q) => client.get('/hospitals', q);
const getHospitalDetails = (id) => client.get(`/hospital/${id}`);
const getTestData = (q) => client.get(`/hospital`, q);

export default {
  getHospitals,
  getHospitalDetails,
  getTestData,
};
