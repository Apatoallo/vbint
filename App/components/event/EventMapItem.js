import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import AppHeart from '../AppHeart';
import IconContainer from '../IconContainer';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import { IconTypes } from '../AppTheme/Icon';
import { useTranslation } from 'react-i18next';

const EventMapItem = ({ title, price, locationName, image, time }) => {
  const { t } = useTranslation();
  const [showTimeInfo, setShowTimeInfo] = useState(false);
  const timeIcon = {
    type: IconTypes.material,
    name: 'access-time',
    size: 25,
  };
  const heartIcon = {
    type: IconTypes.antdesign,
    name: 'hearto',
    color: 'black',
    size: 20,
  };

  return (
    <Block
      noflex
      style={styles.block}
      row
      white
      shadow
      margin={[0, 16, 32, 16]}
      radius={16}>
      <Block row height={130} width={150} shadow>
        <Image style={styles.image} source={image} resizeMode="stretch" />
        <IconContainer
          icon={heartIcon}
          style={styles.heartIcon}
          onPress={() => {}}
        />
        <Block noflex style={styles.timeIcon} row>
          <Block
            noflex
            row
            center
            borderRadius={18}
            white
            style={{ alignItems: 'flex-end' }}>
            {showTimeInfo ? (
              <Text marginBottom marginRight marginLeft>
                {time}
              </Text>
            ) : null}
            <IconContainer
              icon={timeIcon}
              onPress={() => {
                setShowTimeInfo(!showTimeInfo);
              }}
            />
          </Block>
        </Block>
      </Block>
      <Block margin>
        <Text numberOfLines={1} size={18} bold marginBottom={5}>
          {title}
        </Text>
        <Text marginBottom numberOfLines={1}>
          {locationName}
        </Text>
        <Block row noflex marginBottom={5}>
          <Text medium marginRight size={13}>
            {' '}
            {t('activity_date')}
          </Text>
          <Text size={13}>{'21/12/2021'}</Text>
        </Block>
        <Block row noflex marginBottom>
          <Text medium marginRight size={13}>
            {t('activity_duration')}
          </Text>
          <Text size={13}>{'2 gün'}</Text>
        </Block>
        <Block style={styles.price} center>
          <Text bold color={colors.hotelCardGrey} size={20}>
            {price} TL
          </Text>
          <Text size={10} color={colors.hotelCardLightGrey}>
            {t('average_price')}
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default EventMapItem;

const styles = StyleSheet.create({
  image: { height: 157, width: 150, resizeMode: 'cover' },
  block: { overflow: 'hidden' },
  price: { alignSelf: 'flex-end' },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  timeIcon: {
    position: 'absolute',
    top: 55,
    right: 10,
  },
});
