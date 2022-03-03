import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import DestinationSelector from '../../components/flight/DestinationSelector';
import TypeSwitch from '../../components/flight/TypeSwitch';
import DateSelector from '../../components/flight/DateSelector';
import AppButton from '../../components/AppButton';
import PassengersSelector from '../../components/flight/PassengersSelector';
import routes from '../../navigation/routes';
import { useTranslation } from 'react-i18next';

const FlightHomePage = ({ navigation }) => {
  const { t } = useTranslation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          {t('search_flight')}
        </Text>
      ),
    });
  }, [navigation]);
  return (
    <Block white>
      <Block scroll margin={16}>
        <DestinationSelector
          title={t('from')}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeDestination={() => {}}
        />
        <DestinationSelector
          marginTop={16}
          title={t('to')}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeDestination={(item) => {
            console.log(item);
          }}
        />
        <TypeSwitch
          marginTop={22}
          title={t('one_way')}
          onChange={(status) => {
            console.log(status);
          }}
        />
        <TypeSwitch
          marginTop={16}
          title={t('nonstop')}
          onChange={(status) => {
            console.log(status);
          }}
        />
        <DateSelector
          marginTop={22}
          title={t('departure_date')}
          subTitle={t('departure_date_choose')}
          onChangeDate={(item) => {
            console.log(item);
          }}
        />
        <DateSelector
          marginTop={16}
          title={t('return_date')}
          subTitle={t('return_date_choose')}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeDate={(item) => {
            console.log(item);
          }}
        />
        <PassengersSelector
          marginTop={22}
          title={t('passengers')}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeSelect={(value) => {
            console.log(value);
          }}
        />
      </Block>
      <Block style={styles.findBtn} flex={0} margin={16}>
        <AppButton
          title={t('available_flights')}
          onPress={() => {
            navigation.navigate(routes.FLIGHT_LIST_SCREEN, { first: true });
          }}
        />
      </Block>
    </Block>
  );
};

export default FlightHomePage;

const styles = StyleSheet.create({
  findBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
