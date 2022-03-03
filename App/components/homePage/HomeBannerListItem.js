import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import AppLinearGradient from '../AppLinearGradient';
import { Icon, IconTypes } from '../AppTheme/Icon';
import { useTranslation } from 'react-i18next';

const HomeBannerListItem = () => {
  const { t } = useTranslation();
  return (
    <Block margin={[0, 8, 0, 8]} radius={8} style={styles.block}>
      <ImageBackground
        source={require('../../assets/images/10yer.jpeg')}
        resizeMode="stretch"
        style={styles.image}>
        <AppLinearGradient color={'#4E1E00'} />
        <Block
          color={'rgba(0, 0, 0, .2)'}
          radius={16}
          padding
          style={styles.block}>
          <Block center style={styles.bottomContainer}>
            <Block>
              <Text white size={12}>
                {t('must_travel')}
              </Text>
            </Block>
            <Block
              style={[{ alignSelf: 'flex-end' }]}
              marginRight
              white
              center
              middle
              height={20}
              width={20}
              borderRadius={20 / 2}>
              <Icon
                type={IconTypes.antdesign}
                name="arrowright"
                color={'#676767'}
                size={10}
              />
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

export default HomeBannerListItem;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: 8,
    marginBottom: 8,
  },
  block: { overflow: 'hidden' },
});
