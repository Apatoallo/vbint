import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';

const key = 'token';
const refreshKey = 'RefreshToken';
const userKey = 'userKey';
const guestKey = 'guestKey';

const storeToken = async (authToken) => {
  return RNSecureKeyStore.set(key, authToken, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
  }).then(
    (res) => {},
    (err) => {
      console.log(err);
    },
  );
};
const storeUser = async (user) => {
  return RNSecureKeyStore.set(userKey, user, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
  }).then(
    (res) => {},
    (err) => {
      console.log(err);
    },
  );
};

const getToken = async () => {
  return RNSecureKeyStore.get(key);
};

const getUser = async () => {
  return RNSecureKeyStore.get(userKey);
};

const removeToken = async () => {
  RNSecureKeyStore.remove(key).then(
    (res) => {},
    (err) => {
      console.log(err);
    },
  );
};
const removeUser = async () => {
  RNSecureKeyStore.remove(userKey).then(
    (res) => {},
    (err) => {
      console.log(err);
    },
  );
};

const storeRefreshToken = async (authToken) => {
  return RNSecureKeyStore.set(refreshKey, authToken, {
    accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
  }).then(
    (res) => {},
    (err) => {
      console.log(err);
    },
  );
};

const getRefreshToken = async () => {
  return RNSecureKeyStore.get(refreshKey);
};

export default {
  storeToken,
  removeToken,
  getToken,
  getUser,
  storeRefreshToken,
  getRefreshToken,
  storeUser,
  removeUser,
};
