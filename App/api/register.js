import client from './clinet';
import client2 from './clinet2';

const registerNewUser = (userData) => client.post('/user-register', userData);
const getContract = () => client.post('/register');
const registerNewBusiness = (userData) =>
  client.post('/business-register', userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
const getRegisterType = (prop) => client.get('/register-type/9', prop);
const getBusinessType = (prop) => client.get(`/business-type/${prop}`);
const getTowns = (prop) => client2.get('/assets/town.json', prop);
const resetPassword = (userData) => client.post('/forgot-password', userData);
export default {
  registerNewUser,
  getRegisterType,
  getContract,
  getBusinessType,
  getTowns,
  registerNewBusiness,
  resetPassword,
};
