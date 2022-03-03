import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, Image } from 'react-native';
import { Block } from '../components/AppTheme';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import colors from '../config/colors';
import PhotoView from 'react-native-photo-view-ex';
import IconContainer from '../components/IconContainer';

const FullScreenImageSlider = ({ navigation, route }) => {
  const { images, index } = route.params;
  const [activeSlide, setActiveSlide] = useState(0);
  const contentWidth = Dimensions.get('window').width;
  console.log(images);
  const renderImageItem = ({ item, index }) => {
    return (
      <Block noflex white>
        <PhotoView
          source={{ uri: item }}
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          resizeMode="center"
          style={{ width: '100%', height: '100%' }}
        />
      </Block>
    );
  };

  return (
    <Block>
      <Carousel
        data={images}
        renderItem={({ item, index }) => {
          return renderImageItem({ item, index });
        }}
        sliderWidth={contentWidth}
        itemWidth={contentWidth}
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

      <Pagination
        dotsLength={images?.length}
        activeDotIndex={activeSlide}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
        containerStyle={styles.paginationContainer}
      />

      {activeSlide != -1 ? (
        <Text white style={styles.pageText}>
          {activeSlide + 1 + '/' + images?.length}
        </Text>
      ) : null}
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

export default FullScreenImageSlider;

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
    backgroundColor: colors.black,
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
  backIcon: {
    marginLeft: 10,
    marginTop: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
