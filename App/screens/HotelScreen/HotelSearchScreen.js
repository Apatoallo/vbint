import React, { useState } from 'react';
import { Text, Block } from '../../components/AppTheme/index';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import calenderSelector from '../../components/hotelSearch/calenderSelector';
import personSelector from '../../components/hotelSearch/personSelector';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

const HotelSearchScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(0);

  return (
    <Block>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.034407,
          longitude: 27.43054,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      />
      <Block style={styles.block}>
        <Block flex={0.4}></Block>
        <Block>
          <Text bold white size={26} margin>
            {t('round_trip_date') + index}
          </Text>

          <Block white style={styles.selectorBlock} paddingTop>
            <Tab.Navigator swipeEnabled={false} tabBar={() => null}>
              <Tab.Screen name="CalenderTab" component={calenderSelector} />
              <Tab.Screen name="PersonsTab" component={personSelector} />
            </Tab.Navigator>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default HotelSearchScreen;

const styles = StyleSheet.create({
  map: { height: '100%' },
  block: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    backgroundColor: ' rgba(52, 52, 52, 0.5)',
  },

  selectorBlock: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
});
