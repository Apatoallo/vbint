import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import colors from '../config/colors';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Block, Text } from './AppTheme';
import AppImage from './AppImage';

const ImageList = ({ data, imageStyle, marginHorizontal = 0, onPress }) => {
  /**
   * Resim listesini gösterir.
   */

  // variables
  const contentWidth = Dimensions.get('window').width;
  // useState
  const [activeSlide, setActiveSlide] = useState(0);

  const renderImageItem = ({ item, index }) => {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        <AppImage
          url={item}
          style={[
            styles.itemImage,
            { width: contentWidth - marginHorizontal },
            imageStyle,
          ]}
        />
      </TouchableNativeFeedback>
    );
  };

  return (
    <Block flex={0}>
      {data && data.length ? (
        <Carousel
          data={data}
          renderItem={({ item, index }) => {
            return renderImageItem({ item, index });
          }}
          sliderWidth={contentWidth - marginHorizontal}
          itemWidth={
            contentWidth - (marginHorizontal ? marginHorizontal - 5 : 0)
          }
          inactiveSlideOpacity={0.7}
          inactiveSlideScale={0.94}
          activeSlideAlignment={'start'}
          lockScrollWhileSnapping={true}
          useScrollView={true}
          containerCustomStyle={styles.containerCustom}
          onSnapToItem={(index) => {
            setActiveSlide(index);
          }}
        />
      ) : (
        <View style={[styles.emptyImage]} />
      )}

      {activeSlide != -1 && (
        <Pagination
          dotsLength={data?.length}
          activeDotIndex={activeSlide}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
          containerStyle={styles.paginationContainer}
        />
      )}
      {activeSlide != -1 ? (
        <Text white style={styles.pageText}>
          {activeSlide + 1 + '/' + data?.length}
        </Text>
      ) : null}
    </Block>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  itemImage: {
    height: 180,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  emptyImage: {
    height: 180,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: colors.white,
  },
  containerCustom: {
    flexGrow: 0,
  },
  dot: {
    width: 12,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.white,
  },
  inactiveDot: {
    width: 10,
    backgroundColor: colors.lightGray,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  pageText: {
    position: 'absolute',
    bottom: 24,
    right: 21,
  },
});
