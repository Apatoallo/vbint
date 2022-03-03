import React, { useState } from 'react';
import { TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import colors from '../config/colors';
import AppStyles from '../config/AppStyles';
import IconContainer from './IconContainer';
import { IconTypes } from './AppTheme/Icon';
import { useTranslation } from 'react-i18next';

const InfoCard = ({ image, description, name, price, rate, time, onPress }) => {
  const { t } = useTranslation();
  /**
   * Resim, başlık, açıklama ve tutardan oluşan görünümü sağlar.
   */
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        source={image}
        resizeMode="stretch"
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
        style={styles.itemImage}>
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
        <Block bottom>
          <Text medium middle white title>
            {name}
          </Text>
        </Block>
      </ImageBackground>
      <Text padding color={colors.hotelCardGrey}>
        {description}
      </Text>
      <Block padding row center>
        <Block>
          <Text size={12}>{t('average_price')}</Text>
          <Text bold>{price + ' TL'}</Text>
        </Block>
        {rate && (
          <Block noflex>
            <Block
              noflex
              borderRadius={10}
              color={colors.lightGray}
              width={40}
              height={40}
              center
              middle>
              <Text weight="600" size={14} center bold>
                {rate}
              </Text>
            </Block>
          </Block>
        )}
      </Block>
    </TouchableOpacity>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  itemImage: {
    width: 220,
    height: 165,
    padding: 10,
  },
  container: {
    width: 220,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginRight: 20,
    marginBottom: 30,
    ...AppStyles.shadow,
  },
  heartIcon: {
    alignSelf: 'flex-end',
  },
  timeIcon: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});
