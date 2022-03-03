import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from './AppTheme';
import StarRating from './StarRating';
import Separator from './Separator';
import colors from '../config/colors';
import ImageList from './ImageList';
import AppStyles from '../config/AppStyles';
import { IconTypes } from './AppTheme/Icon';
import IconContainer from './IconContainer';
import { useTranslation } from 'react-i18next';

const Card = ({
  onPress,
  name,
  location,
  description,
  price,
  discountedPrice,
  footerRightFirstText,
  footerRightSecondText,
  imageList,
  marginBottom,
  footerRightFirstTitle,
  footerRightSecondTitle,
  time,
}) => {
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
    <Block style={[styles.container, { marginBottom: marginBottom }]}>
      <Block noflex>
        <ImageList data={imageList} marginHorizontal={32} />
        <IconContainer
          icon={heartIcon}
          style={styles.heartIcon}
          onPress={() => {}}
        />
        {time ? (
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
        ) : null}
        <TouchableOpacity onPress={onPress}>
          <Block paddingHorizontal paddingTop noflex>
            <Text
              marginBottom={5}
              bold
              style={{
                fontSize: 20,
              }}>
              {name}
            </Text>
            <Text
              marginBottom={5}
              medium
              style={{
                fontSize: 14,
              }}>
              {location}
            </Text>

            <Block row>
              <Text>{4.8}</Text>
              <StarRating score={4.8} />
            </Block>
          </Block>

          <Separator backgroundColor={colors.lightGray} />
          <Text margin color={colors.hotelCardGrey}>
            {description}
          </Text>
          <Separator backgroundColor={colors.lightGray} marginBottom />
          <Block row padding center>
            <Block>
              <Block row center>
                {price ? (
                  <Text
                    marginRight
                    bold
                    style={{ textDecorationLine: 'line-through' }}>
                    {price} TL
                  </Text>
                ) : null}
                <Text
                  bold
                  style={{
                    fontSize: 19,
                  }}>
                  {discountedPrice} TL
                </Text>
              </Block>
              <Block>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'montserrat-medium',
                  }}>
                  {t('average_price')}
                </Text>
              </Block>
            </Block>

            <Block noflex>
              <Block row center>
                <Text bold>{footerRightFirstTitle + ' : '}</Text>
                <Text size={13}>{footerRightFirstText}</Text>
              </Block>
              <Block row center right>
                <Text bold>{footerRightSecondTitle + ' : '}</Text>
                <Text size={13}>{footerRightSecondText}</Text>
              </Block>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    ...AppStyles.shadow,
  },
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
