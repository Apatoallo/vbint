import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Block, Text, TextInput } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import PersonCountSelector from '../../components/PersonCountSelector';
import routes from '../../navigation/routes';
import TimePicker from '../../components/TimePicker';
import RestaurantDateSelector from '../../components/restaurant/RestaurantDateSelector';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const TransferRezScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { transfer } = route.params;
  const [adultsCount, setAdultsCount] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [time, setTime] = useState(null);
  const [departureAddress, setDepartureAddress] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <Block>
          <Text
            numberOfLines={1}
            {...props}
            size={16}
            onPress={() => {
              navigation.navigate(routes.SEARCH_SCREEN);
            }}>
            {t('vip_transfer_title')}
          </Text>
        </Block>
      ),
    });
  }, [navigation]);

  return (
    <Block
      paddingHorizontal={16}
      white
      scroll
      contentContainerStyle={styles.contentContainer}>
      <Text bold title marginBottom={25}>
        {transfer.title}
      </Text>
      <Block>
        <RestaurantDateSelector
          title={t('date')}
          onDateSelect={(startDate) => {
            setStartDate(startDate);
          }}
        />
        <TimePicker
          title={t('time')}
          defaultDate={startDate}
          onSave={(newTime) => {
            setTime(newTime);
          }}
          marginTop
          noflex
        />
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

        <Block noflex>
          <Text bold marginBottom>
            {t('departure_address')}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setDepartureAddress}
            value={departureAddress}
            multiline={true}
          />
        </Block>
        <Block noflex marginTop>
          <Text bold marginBottom>
            {t('arrival_address')}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={setDestinationAddress}
            value={destinationAddress}
            multiline={true}
          />
        </Block>
      </Block>

      <Block flex={0} marginTop={16}>
        <AppButton
          title={t('go_on')}
          onPress={() => {
            navigation.navigate(routes.RESERVATION_PERSON_INFO, {
              data: {
                person: adultsCount,
                departureDate: startDate.format('YYYY-MM-DD'),
                time: moment(time).format('LT'),
                destinationAddress: destinationAddress,
                departureAddress: departureAddress,
                id: transfer.id,
                moduleId: transfer.moduleId,
              },
            });
          }}
          disabled={
            adultsCount &&
            startDate &&
            time &&
            destinationAddress &&
            departureAddress
              ? false
              : true
          }
        />
      </Block>
    </Block>
  );
};

export default TransferRezScreen;

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
  input: {
    height: 500,
    textAlignVertical: 'top',
    padding: 16,
  },
});
