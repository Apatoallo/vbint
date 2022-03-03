import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import DestinationSelector from '../../components/flight/DestinationSelector';
import TypeSwitch from '../../components/flight/TypeSwitch';
import DateSelector from '../../components/flight/DateSelector';
import AppButton from '../../components/AppButton';
import routes from '../../navigation/routes';
import TimeSelector from '../../components/carRent/TimeSelector';

const CarRentHomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          ARAÇ KIRALAMA
        </Text>
      ),
    });
  }, [navigation]);
  return (
    <Block white>
      <Block scroll contentContainerStyle={{ paddingBottom: 80 }} margin={16}>
        <DestinationSelector
          title={'Alış Noktası'}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeDestination={() => {}}
        />

        <TypeSwitch
          marginTop={16}
          title={'Farklı bir konuma teslim edeceğim. '}
          onChange={(status) => {
            console.log(status);
          }}
        />
        <DestinationSelector
          marginTop={22}
          title={'Teslim Noktası'}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeDestination={() => {}}
        />
        <DateSelector
          marginTop={16}
          title={'Gidiş Tarihi'}
          subTitle={'Lütfen gidiş tarihi seçiniz'}
          onChangeDate={(item) => {
            console.log(item);
          }}
        />
        <TimeSelector
          marginTop={16}
          title={'Gidiş Saati'}
          subTitle={'Lütfen saat seçiniz'}
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
        <TimeSelector
          marginTop={16}
          title={'Dönüş Saati'}
          subTitle={'Lütfen saat seçiniz'}
          itemsList={[
            { title: 'Ankara' },
            { title: 'Dalaman ' },
            { title: 'Gimat  ' },
          ]}
          onChangeDate={(item) => {
            console.log(item);
          }}
        />
      </Block>
      <Block style={styles.findBtn} flex={0} margin={16}>
        <AppButton
          title={'Uygun Araçları Bul'}
          onPress={() => {
            navigation.navigate(routes.CAR_LIST_SCREEN);
          }}
        />
      </Block>
    </Block>
  );
};

export default CarRentHomeScreen;

const styles = StyleSheet.create({
  findBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
