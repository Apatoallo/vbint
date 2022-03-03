import client from './clinet';

const getPermissionList = () => client.get('/my-permissions');

const updatePermission = (params) => client.post('/my-permissions', params);

const updateCorporationPermission = (params) =>
  client.post('/my-corporation-permissions', params);

const getCorporationPermissionList = () =>
  client.get('/my-corporation-permissions');

export default {
  getPermissionList,
  updatePermission,
  updateCorporationPermission,
  getCorporationPermissionList,
};
