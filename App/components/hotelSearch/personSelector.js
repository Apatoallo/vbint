import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Icon, Text } from '../AppTheme/index';
import { IconTypes } from '../AppTheme/Icon';
import PersonCountSelector from '../PersonCountSelector';
import AppButton from '../AppButton';
import routes from '../../navigation/routes';
import { useTranslation } from 'react-i18next';

const personSelector = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [adultsCount, setAdultsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);

  return (
    <Block space={'between'} white>
      <TouchableOpacity
        style={{ marginLeft: 16 }}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          type={IconTypes.fontAwesome}
          name={'angle-left'}
          color="gray"
          size={30}
        />
      </TouchableOpacity>

      <PersonCountSelector
        title={t('adults')}
        subTitle={t('up_13')}
        name={t('adult')}
        updateCount={(count) => {
          setAdultsCount(count);
        }}
      />
      <PersonCountSelector
        title={t('children')}
        subTitle={t('between_2_12')}
        name={t('child')}
        updateCount={(count) => {
          setChildrenCount(count);
        }}
      />
      <Block row center space={'between'} margin={16}>
        <Block>
          <Text
            style={styles.nextTitle}
            bold
            onPress={() => {
              navigation.navigate(routes.HOTEL_LISTING_SCREEN, {
                startDate: route?.params?.startDate,
                endDate: route?.params?.endDate,
                adultsCount: adultsCount,
                childrenCount: childrenCount,
              });
            }}>
            {t('skip')}
          </Text>
        </Block>
        <Block>
          <AppButton
            disabled={adultsCount > 0 ? false : true}
            title={t('next')}
            onPress={() => {
              navigation.navigate(routes.HOTEL_LISTING_SCREEN, {
                startDate: route?.params?.startDate,
                endDate: route?.params?.endDate,
                adultsCount: adultsCount,
                childrenCount: childrenCount,
              });
            }}
          />
        </Block>
      </Block>
    </Block>
  );
};

export default personSelector;

const styles = StyleSheet.create({});
