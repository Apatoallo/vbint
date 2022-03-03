import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Block } from './AppTheme/index';

const SmallMap = ({ latitude, longitude }) => {
  /*
Sol üst: 37.180144, 27.173693
Sağ üst: 37.180144, 27.466479

Sol alt: 36.941550, 27.186933
Sağ alt: 36.941550, 27.461890
*/
  let latDiff = 37.180144 - 36.94155;
  let newLatDiff = 37.180144 - latitude;
  let smallMapLat = (newLatDiff / latDiff) * 90;

  let lanDiff = 27.173693 - 27.46189;
  let newLongDiff = 27.173693 - longitude;
  let smallMapLan = (newLongDiff / lanDiff) * 70;
  return (
    <Block width={100} height={100}>
      <SvgUri
        width={'100%'}
        height={'100%'}
        uri="https://visitbodrum.4alabs.com/assets_web/img/svg/bodrum-s-image-2.svg"
      />
      <Image
        style={[styles.pin, { top: smallMapLat, left: smallMapLan }]}
        source={require('../assets/images/dropbin.png')}
      />
    </Block>
  );
};

export default SmallMap;

const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
    height: 15,
    width: 15,
  },
});
