import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import GalleryImageList from '../../components/gallery/GalleryImageList';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { useTranslation } from 'react-i18next';

const GalleryDetailsScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          {t('historical_places')}
        </Text>
      ),
    });
  }, [navigation]);

  return (
    <Block
      white
      scroll
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}>
      <GalleryImageList
        data={route.params.detailData}
        imageStyle={styles.headerImage}
        initialIndex={route.params.initialIndex}
      />
    </Block>
  );
};

export default GalleryDetailsScreen;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
  },
  headerImage: {
    resizeMode: 'cover',
  },
  possibilityIcon: {
    marginBottom: 5,
  },

  rightIcon: {
    marginBottom: 10,
  },
  headerIconsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  map: {
    height: 150,
    width: '100%',
    borderRadius: 16,
  },
  serviceItemText: {
    flex: 1,
  },
  headerContentContainer: {
    position: 'absolute',
    top: 0,
  },
  imageLabelContainer: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    marginBottom: 8,
  },
});
