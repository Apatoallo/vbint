import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Block } from '../components/AppTheme';
import IconContainer from '../components/IconContainer';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';

const FullScreenMap = ({ navigation, route }) => {
  return (
    <Block>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: route.params.latitude,
            longitude: route.params.longitude,
          }}>
          <Image
            source={require('../assets/images/dropbin.png')}
            style={AppStyles.pin}
          />
        </Marker>
      </MapView>
      <IconContainer
        icon={{
          type: 'fontAwesome',
          name: 'angle-left',
          size: 27,
          color: colors.blackGrey,
        }}
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backIcon}
        backgroundColor={colors.white}
      />
    </Block>
  );
};

export default FullScreenMap;

const styles = StyleSheet.create({
  backIcon: {
    marginLeft: 10,
    marginTop: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  map: { height: '100%' },
});
