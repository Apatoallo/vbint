import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Block, Text, Button } from '../components/AppTheme/index';
import routes from '../navigation/routes';
import { useAuthReducer } from '../reducers/authReducer';
import storage from '../auth/storage';
import { StackActions } from '@react-navigation/native';
import home from '../api/home';
import useApi from '../hooks/useApi';
import DeviceInfo from 'react-native-device-info';
import LoadingIndicator from '../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StoreData from '../utils/StoreData';

const SplashScreen = ({ navigation }) => {
  const { setLogin, setLogout, loginStatus } = useAuthReducer();
  const api = useApi(home.getUserData);
  const { i18n } = useTranslation();

  useEffect(() => {
    getStoredLang();
    getUserData();
  }, []);

  const getStoredLang = async () => {
    const lang = await AsyncStorage.getItem('lang');
    if (lang) {
      i18n.changeLanguage(lang);
    } else {
      StoreData.storeData('lang', i18n.language);
    }
  };
  const getUserData = async () => {
    let response = await api.request({
      appVersion: DeviceInfo.getVersion(),
      deviceBrand: DeviceInfo.getBrand(),
      osType: Platform.OS === 'ios' ? 'Ios' : 'Android',
      osVersion: DeviceInfo.getSystemVersion(),
    });
    if (response.ok) {
      const firstTime = await AsyncStorage.getItem('firstTime');
      storage.storeToken(response.data.data.user.apiToken);
      switch (response.data.data.user.userType) {
        case 'visitor':
          setLogin(response.data.data.user);
          if (firstTime !== '1') {
            StoreData.storeData('firstTime', '1');
            navigation.dispatch(StackActions.replace(routes.TUTORIAL_SCREEN));
          } else {
            navigation.dispatch(StackActions.replace(routes.LOGIN_STACK));
          }
          break;

        default:
          setLogin(response.data.data.user);
          navigation.dispatch(StackActions.replace(routes.HOME_PAGE));
          break;
      }
    } else {
    }
  };

  return (
    <Block>
      <LoadingIndicator visible={api.loading} />
    </Block>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  text: { fontWeight: 'bold' },
});
