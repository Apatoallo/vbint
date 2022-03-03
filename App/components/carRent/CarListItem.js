import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import Separator from '../Separator';
import { useTranslation } from 'react-i18next';

const CarListItem = ({ onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        radius={8}
        shadow
        white
        margin={[12, 24, 12, 24]}
        style={AppStyles.overflow}>
        <Block>
          <Block shadow black>
            <Image
              source={require('../../assets/images/car.png')}
              style={styles.image}
            />
          </Block>

          <Block white style={AppStyles.overflow}>
            <Block padding>
              <Block row space={'between'}>
                <Text bold size={18}>
                  Hyundai i20
                </Text>
                <Text color={colors.lightGreen}>Ekonomi</Text>
              </Block>
            </Block>
            <Separator backgroundColor={colors.lightGray} />
            <Block padding>
              <Block row space={'between'}>
                <Text medium>Manuel-Benzin</Text>
                <Text size={14} color={colors.blackGrey}>
                  140.40 km
                </Text>
              </Block>
            </Block>
            <Separator backgroundColor={colors.lightGray} />
            <Block padding={[16, 8, 16, 8]} center row space={'between'}>
              <Block paddingLeft>
                <Text bold size={20}>
                  215 ₺
                </Text>
                <Text size={12}>{t('average_price')}</Text>
              </Block>
              <Block flex={0}>
                <Image
                  source={require('../../assets/images/rent_logo.png')}
                  style={styles.logo}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default CarListItem;

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: 30,
  },
  image: { height: 200, resizeMode: 'cover' },
});
