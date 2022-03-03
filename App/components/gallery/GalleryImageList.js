import React, { useState, useRef } from 'react';
import { StyleSheet, Dimensions, Linking } from 'react-native';
import colors from '../../config/colors';
import Carousel from 'react-native-snap-carousel';
import { Block, Text } from '../AppTheme';
import IconContainer from '../IconContainer';
import AppStyles from '../../config/AppStyles';
import AppImage from '../AppImage';

const imageHeight = Dimensions.get('screen').height * 0.7;

const GalleryImageList = ({ data, imageStyle, initialIndex }) => {
  /**
   * Resim listesini gösterir.
   */
  // useRef
  const slideRef = useRef(null);

  // variables
  const contentWidth = Dimensions.get('window').width;
  // useState
  const [activeSlide, setActiveSlide] = useState(
    data && data.length > 1 ? (initialIndex ? initialIndex : 0) : -1,
  );

  const renderImageItem = ({ item, index }) => {
    const headerIcons = [
      {
        icon: {
          name: 'share',
          type: 'simpleLineIcon',
        },
        onPress: () => {
          Linking.openURL(item.url);
        },
      },
    ];
    return (
      <Block shadow>
        <Block
          flex
          radius={16}
          shadow
          marginHorizontal={2}
          marginBottom={3}
          marginTop={3}
          backgroundColor={colors.white}
          style={AppStyles.overflow}>
          <AppImage
            url={item.link}
            style={[styles.tourImage, { width: contentWidth - 40 }, imageStyle]}
          />
          <Text style={styles.title} white medium size={20}>
            {item.title}
          </Text>
          <Block style={styles.headerIconsContainer}>
            {headerIcons.map((item, index) => {
              return (
                <IconContainer
                  icon={{ ...item.icon, size: 20 }}
                  onPress={item.onPress}
                  style={styles.rightIcon}
                  backgroundColor={colors.white}
                />
              );
            })}
          </Block>
          <Block paddingHorizontal={8} paddingBottom={16}>
            <Text size={16} medium color={colors.hotelCardLightGrey}>
              {item.description}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex={0}>
      <Carousel
        data={data}
        renderItem={({ item, index }) => {
          return renderImageItem({ item, index });
        }}
        ref={(value) => {
          slideRef.current = value;
        }}
        firstItem={initialIndex}
        sliderWidth={contentWidth - 32}
        itemWidth={contentWidth - 37}
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
      {activeSlide != -1 && (
        <IconContainer
          icon={{
            type: 'fontAwesome',
            name: 'angle-left',
            size: 20,
            color: colors.blackGrey,
          }}
          onPress={() => {
            slideRef.current.snapToPrev();
          }}
          style={styles.backIcon}
          backgroundColor={colors.white}
        />
      )}
      {activeSlide != -1 && (
        <IconContainer
          icon={{
            type: 'fontAwesome',
            name: 'angle-right',
            size: 20,
            color: colors.blackGrey,
          }}
          onPress={() => {
            slideRef.current.snapToNext();
          }}
          style={styles.nextIcon}
          backgroundColor={colors.white}
        />
      )}
    </Block>
  );
};

export default GalleryImageList;

const styles = StyleSheet.create({
  tourImage: {
    height: imageHeight,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -5,
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
  backIcon: {
    position: 'absolute',
    top: (imageHeight - 20) / 2,
    left: 10,
  },
  nextIcon: {
    position: 'absolute',
    top: (imageHeight - 20) / 2,
    right: 12,
  },
  rightIcon: {
    marginBottom: 10,
  },
  title: {
    position: 'absolute',
    left: 10,
    top: imageHeight - 50,
  },
  headerIconsContainer: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
});
