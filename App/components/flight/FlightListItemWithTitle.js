import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import { useTranslation } from 'react-i18next';

const FlightListItemWithTitle = ({ title, subTitle, showLogo = true }) => {
  const { t } = useTranslation();
  return (
    <Block white flex={0}>
      <Block margin={[0, 16, 0, 16]} row center space={'between'}>
        <Text size={14} style={AppStyles.hyperLink}>
          {title}
        </Text>
        <Text size={14} style={AppStyles.hyperLink}>
          {subTitle}
        </Text>
      </Block>
      <Block
        flex={0}
        radius={16}
        shadow
        white
        padding={16}
        margin={[0, 16, 0, 16]}>
        <Block white row center space={'between'}>
          <Text size={26} bold color={colors.secondary}>
            125 TL
          </Text>
          {showLogo && (
            <Image
              style={styles.logo}
              source={require('../../assets/images/flight_logo.png')}
            />
          )}
        </Block>
        <Block white marginTop={16} row center space={'between'}>
          <Block>
            <Text medium size={12} color={'#8D92A3'} numberOfLines={1}>
              İZMİR ADB- MİLAS BODRUM
            </Text>
          </Block>
          <Text medium size={12} color={'#8D92A3'}>
            {showLogo ? t('flight_duration') : t('travel_duration')}
          </Text>
        </Block>
        <Block white marginTop={2} row center space={'between'}>
          <Text bold>10:25 – 12:50</Text>
          <Text bold>2s 40d</Text>
        </Block>
      </Block>
    </Block>
  );
};

export default FlightListItemWithTitle;

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    height: 30,
  },
});
