import React from 'react';
import { Alert, Linking, Platform } from 'react-native';

const openMap = ({ latitude, longitude, address }) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${latitude},${longitude}`;
  const url = Platform.select({
    ios: `${scheme}${address}@${latLng}`,
    android: `${scheme}${latLng}(${address})`,
  });
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Bir hata oluştu. Haritalar desteklenmiyor.');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => {
      Alert.alert('Bir hata oluştu. Haritalar açılamadı.');
    });
};

export default {
  openMap,
};
