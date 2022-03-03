import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import DestinationSelector from '../../components/flight/DestinationSelector';

import DateSelector from '../../components/flight/DateSelector';
import AppButton from '../../components/AppButton';
import PassengersSelector from '../../components/flight/PassengersSelector';
import routes from '../../navigation/routes';

const BusTicketHomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          YOLCULUK ARA
        </Text>
      ),
    });
  }, [navigation]);
  return (
    <Block white>
      <Block scroll margin={16}>
        <DestinationSelector
          title={'Nereden'}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeDestination={() => {}}
        />
        <DestinationSelector
          marginTop={16}
          title={'Nereden'}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeDestination={(item) => {
            console.log(item);
          }}
        />

        <DateSelector
          marginTop={22}
          title={'Gidiş Tarihi'}
          subTitle={'Lütfen gidiş tarihi seçiniz'}
          onChangeDate={(item) => {
            console.log(item);
          }}
        />
        <DateSelector
          marginTop={16}
          title={'Dönüş Tarihi'}
          subTitle={'Lütfen dönüş tarihi seçiniz'}
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
          title={'Yolcular'}
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
          title={'Uygun Yolculukları Bul'}
          onPress={() => {
            navigation.navigate(routes.BUS_LIST_SCREEN, { first: true });
          }}
        />
      </Block>
    </Block>
  );
};

export default BusTicketHomeScreen;

const styles = StyleSheet.create({
  findBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
