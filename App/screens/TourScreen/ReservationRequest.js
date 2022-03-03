import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import PersonCountSelector from '../../components/PersonCountSelector';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import Icon, { IconTypes } from '../../components/AppTheme/Icon';
import { useTranslation } from 'react-i18next';

const ReservationRequest = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { tour } = route.params;
  const [adultsCount, setAdultsCount] = useState(null);

  return (
    <Block
      paddingHorizontal={16}
      white
      scroll
      contentContainerStyle={styles.contentContainer}>
      <Text notera marginLeft color={colors.lightGray} size={45}>
        {tour.title}
      </Text>
      <Text bold title marginBottom={25}>
        {tour.title}
      </Text>
      <Block>
        <Block
          marginTop
          row
          center
          space={'between'}
          padding={12}
          radius={12}
          borderWidth={0.5}
          borderColor={colors.inputBorder}>
          <Text color={'#5191FA'}>{tour.departureDate}</Text>
          <Icon
            name={'calendar-blank-outline'}
            type={IconTypes.materialCommunity}
            size={24}
            color={colors.secondary}
          />
        </Block>

        <Block flex={0} marginTop>
          <PersonCountSelector
            titleSize={16}
            marginHorizontal={0}
            title={t('person_count')}
            subTitle={''}
            name={t('person')}
            updateCount={(count) => {
              setAdultsCount(count);
            }}
          />
        </Block>
      </Block>

      <Block flex={0}>
        <AppButton
          title={t('go_on')}
          onPress={() => {
            navigation.navigate(routes.RESERVATION_PERSON_INFO, {
              type: 'restaurant',
              data: {
                person: adultsCount,
                date: tour.departureDate,
                id: tour.id,
                moduleId: tour.moduleId,
              },
            });
          }}
          style={styles.continueButton}
          disabled={adultsCount ? false : true}
        />
      </Block>
    </Block>
  );
};

export default ReservationRequest;

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    backgroundColor: ' rgba(52, 52, 52, 0.5)',
  },

  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },
});
