import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme/index';
import ImageList from '../ImageList';
import AppHeart from '../AppHeart';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import Separator from '../Separator';
import CampaignAvailableItem from '../CampaignAvailableItem';
import constants from '../../config/constants';
import { useTranslation } from 'react-i18next';
import { useAuthReducer } from '../../reducers/authReducer';

const EventListItem = ({
  onPress,
  imageList,
  title,
  description,
  address,
  isFavorite,
  isMemoryBook,
  time,
  date,
  priceAverage,
  leftDay,
}) => {
  const { t } = useTranslation();
  const { userIsBusiness } = useAuthReducer();
  return (
    <Block shadow>
      <Block
        radius={8}
        shadow
        white
        margin={[12, 24, 12, 24]}
        style={AppStyles.overflow}>
        <Block>
          <Block>
            <ImageList
              data={imageList}
              imageStyle={styles.image}
              onPress={onPress}
            />
            {!userIsBusiness && (
              <AppHeart
                isFavorite={isFavorite}
                isMemoryBook={isMemoryBook}
                time={leftDay}
              />
            )}
            <CampaignAvailableItem />
          </Block>
          <TouchableOpacity onPress={onPress}>
            <Block>
              <Block padding>
                <Block>
                  <Text medium size={22}>
                    {title}
                  </Text>
                </Block>
                <Text medium>{address}</Text>
              </Block>
              <Separator backgroundColor={colors.lightGray} />
              <Block flex={1}>
                <Text
                  numberOfLines={4}
                  style={styles.description}
                  padding
                  color={colors.hotelCardGrey}>
                  {description}
                </Text>
              </Block>
              <Separator backgroundColor={colors.lightGray} />
              <Block margin>
                <Block row center space={'between'}>
                  <Block noflex>
                    <Text bold size={18}>
                      {priceAverage} {constants.currency}
                    </Text>
                    <Text size={12}>{t('average_price')}</Text>
                  </Block>
                  <Block nofelx center style={styles.details}>
                    <Text numberOfLines={1} size={12}>
                      <Text numberOfLines={1} size={12} bold>
                        {t('activity_date')}
                      </Text>{' '}
                      {date}
                    </Text>
                    <Text numberOfLines={1} size={12}>
                      <Text numberOfLines={1} size={12} bold>
                        {t('activity_duration')}
                      </Text>{' '}
                      {time}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default EventListItem;

const styles = StyleSheet.create({
  description: { height: 100 },
  details: { alignItems: 'flex-end' },
});
