import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import Separator from '../Separator';
import { Icon, IconTypes } from '../AppTheme/Icon';
import AppImage from '../AppImage';
import { useTranslation } from 'react-i18next';
import AppStyles from '../../config/AppStyles';

const TodayActivityListItem = ({ item, onPress }) => {
  const { t } = useTranslation();
  console.log(item);
  return (
    <Block shadow margin>
      <Block radius={8} white shadow style={AppStyles.overflow}>
        <TouchableOpacity onPress={onPress}>
          <Block flex={0} width={Dimensions.get('screen').width * 0.85} row>
            <Block row width={100}>
              <AppImage url={item.images[0]} style={styles.image} />
            </Block>
            <Block noFlex margin>
              <Text marginBottom medium>
                {item.title}
              </Text>
              <Separator backgroundColor={colors.blackGrey} />
              <Block marginTop center row flex={0} marginBottom>
                <Icon
                  name="location"
                  size={24}
                  color={colors.activityColor}
                  type={IconTypes.evilicon}
                />
                <Block>
                  <Text color={colors.activityColor} size={13}>
                    {item.address}
                  </Text>
                </Block>
              </Block>
              <Separator backgroundColor={colors.blackGrey} />
              <Block marginTop center row flex={0} marginBottom>
                <Icon
                  name="calendar"
                  size={20}
                  color={colors.activityColor}
                  type={IconTypes.feather}
                />
                <Block>
                  <Text color={colors.activityColor} marginLeft={4} size={13}>
                    {item.startTime + ' - ' + item?.finishTime}
                  </Text>
                </Block>
              </Block>
              <Separator backgroundColor={colors.blackGrey} />
              <Block row center marginTop space={'between'}>
                <Block row marginLeft={8}>
                  {item.joiners.map((item) => {
                    return (
                      <Block flex={0} marginLeft={item.index !== 1 ? -8 : 0}>
                        <AppImage style={styles.avatar} url={item.profile} />
                      </Block>
                    );
                  })}
                </Block>
                <Block marginLeft>
                  <Text size={12}>Kişinin daha takviminde</Text>
                </Block>
              </Block>
            </Block>
          </Block>
          <Separator backgroundColor={colors.blackGrey} />
          <Block row center marginTop space={'between'}>
            <Block row marginLeft={8}>
              {item.joiners.map((item) => {
                return (
                  <Block flex={0} marginLeft={item.index !== 1 ? -8 : 0}>
                    <AppImage style={styles.avatar} url={item.profile} />
                  </Block>
                );
              })}
            </Block>
            <Block marginLeft>
              <Text size={12}>{t('on_the_calendar')}</Text>
            </Block>
          </Block>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default TodayActivityListItem;

const styles = StyleSheet.create({
  image: { height: 'auto', width: 100, resizeMode: 'cover' },
  block: { overflow: 'hidden' },
  price: { alignSelf: 'flex-end' },
  avatar: { height: 25, width: 25, borderRadius: 12 },
});
