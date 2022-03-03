import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Block, Icon } from '../AppTheme/index';
import { IconTypes } from '../AppTheme/Icon';
import AppImage from '../AppImage';
import { useTranslation } from 'react-i18next';

const HomePageSliderItemTour = ({ item, onPress }) => {
  const { t } = useTranslation();
  return (
    <Block
      marginBottom={2}
      marginLeft
      marginRight
      white
      shadow
      style={[styles.overflow]}
      radius={6}>
      <TouchableOpacity onPress={onPress}>
        <Block>
          <Block>
            <AppImage style={styles.image} url={item.images[0]} />
            <Text style={styles.title} white margin bold size={12}>
              {item.title}
            </Text>
          </Block>
          <Block padding={6}>
            <Block>
              <Block center row>
                <Icon name={'clock'} type={IconTypes.evilicon} size={12} />
                <Text size={10}>
                  {item.duration} {item.durationUnit}
                </Text>
              </Block>
              <Text size={10}>
                {t('start_time')} {item.startTime}
              </Text>
            </Block>
          </Block>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default HomePageSliderItemTour;

const styles = StyleSheet.create({
  title: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  image: {
    width: Dimensions.get('screen').width * 0.4,
    height: 170,
  },
  overflow: {
    overflow: 'hidden',
  },
});
