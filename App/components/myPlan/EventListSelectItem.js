import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import TodayActivityListItem from '../myCalender/TodayActivityListItem';
import AppStyles from '../../config/AppStyles';
import { useTranslation } from 'react-i18next';

const EventListSelectItem = () => {
  const { t } = useTranslation();
  return (
    <Block>
      <Text style={AppStyles.hyperLink}>{t('add')}</Text>
      <TodayActivityListItem onPress={() => {}} />
    </Block>
  );
};

export default EventListSelectItem;

const styles = StyleSheet.create({});
