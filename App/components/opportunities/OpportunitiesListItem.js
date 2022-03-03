import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from '../AppTheme';
import Separator from '../Separator';
import colors from '../../config/colors';
import IconContainer from '../IconContainer';
import { IconTypes } from '../AppTheme/Icon';
import AppStyles from '../../config/AppStyles';
import AppImage from '../AppImage';
import { useTranslation } from 'react-i18next';

const OpportunitiesListItem = ({ item, onJoin }) => {
  const { t } = useTranslation();
  return (
    <Block shadow>
      <Block
        flex={0}
        shadow
        margin={[12, 24, 12, 24]}
        radius={8}
        style={AppStyles.overflow}>
        <Block flex={0}>
          <Block>
            <AppImage style={styles.image} source={item.image} />
            <TouchableOpacity style={styles.btn} onPress={onJoin}>
              <Block
                shadow
                marginBottom={16}
                padding={[8, 32, 8, 32]}
                radius={20}
                center
                flex={0}
                color={'#FFC300'}>
                <Text white bold>
                  {t('join')}
                </Text>
              </Block>
            </TouchableOpacity>
            <Block style={styles.icons} margin>
              <Block
                noflex
                row
                center
                middle
                borderRadius={18}
                color={item.active ? colors.white : colors.notActive}>
                <Text
                  margin={[8, 8, 8, 12]}
                  color={item.active ? colors.black : colors.white}
                  size={14}>
                  {item.active ? item.dayLeft + ' ' + t('stayed') : t('ended')}
                </Text>
                <IconContainer
                  backgroundColor={
                    item.active ? colors.white : colors.notActive
                  }
                  icon={{
                    type: IconTypes.material,
                    name: 'access-time',
                    size: 25,
                    color: item.active ? colors.black : colors.white,
                  }}
                  onPress={() => {}}
                />
              </Block>
            </Block>
          </Block>
        </Block>
        <Block white style={[styles.block]}>
          <Block padding>
            <Block>
              <Text bold numberOfLines={3}>
                {item.title}
              </Text>
            </Block>
          </Block>
          <Separator backgroundColor={colors.lightGray} />
          <Text padding color={colors.hotelCardGrey} numberOfLines={5}>
            {item.description}
          </Text>
          <Separator backgroundColor={colors.lightGray} />
          <Block center row paddingLeft paddingRight marginTop>
            <Icon
              type={IconTypes.ionicon}
              name={'md-time-outline'}
              color={colors.hotelCardGrey}
              size={24}
            />
            <Text color={colors.hotelCardGrey} size={14} marginLeft>
              {t('deadline')} {item.expiredDate}
            </Text>
          </Block>
          <Block center row padding>
            <Icon
              type={IconTypes.material}
              name={'error-outline'}
              color={colors.hotelCardGrey}
              size={24}
            />
            <Block>
              <Text color={colors.hotelCardGrey} size={14} marginLeft>
                {item.conditions.description}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default OpportunitiesListItem;

const styles = StyleSheet.create({
  image: {
    height: 150,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  icons: { position: 'absolute', top: 0, right: 0 },
  btn: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
