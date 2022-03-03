import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../components/AppTheme/index';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import IconContainer from '../components/IconContainer';
import AppStyles from '../config/AppStyles';
import CircleMarker from '../components/CircleMarker';
import AppImage from '../components/AppImage';

const Map = ({ route, navigation }) => {
  const { list } = route.params;

  const backIcon = {
    type: 'fontAwesome',
    name: 'angle-left',
    size: 27,
    color: 'gray',
  };

  const renderMarker = (row) => {
    /**
     * Harita üzerinde marker leri gösterir.
     */
    return <CircleMarker text={row} />;
  };

  const renderCallout = ({ title, url }) => {
    return (
      <Block noflex style={AppStyles.overflow} radius={16} white margin>
        <AppImage url={url} style={styles.image} />
        <Block padding noflex>
          <Text marginBottom medium size={15} title>
            {title}
          </Text>
        </Block>
      </Block>
    );
  };

  return (
    <Block>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: list[0].latitude,
          longitude: list[0].longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        style={styles.map}>
        {list.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}>
              {renderMarker(marker.prioty)}
              <Callout tooltip={true}>
                {renderCallout({
                  title: marker.title,
                  url: marker.imageSrc,
                })}
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <IconContainer
        icon={backIcon}
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backIcon}
      />
    </Block>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  circleOut: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...AppStyles.shadow,
  },
  circleIn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    position: 'absolute',
    left: 15,
    bottom: -7,
  },
  backIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
  },

  footerFirstText: {
    flex: 1,
  },
});
