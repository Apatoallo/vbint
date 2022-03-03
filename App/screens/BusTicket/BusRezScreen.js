import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import AppButton from '../../components/AppButton';
import FlightListItemWithTitle from '../../components/flight/FlightListItemWithTitle';
import SubmitRezPopUp from '../../components/flight/SubmitRezPopUp';

const BusRezScreen = ({ navigation }) => {
  const [submitPopUpVisible, setSubmitPopUpVisible] = useState(false);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          BİLETLERİNİZ
        </Text>
      ),
    });
  }, [navigation]);
  return (
    <Block white>
      <Block>
        <FlightListItemWithTitle
          title={'Gidiş Biletiniz'}
          subTitle={'16 / 11 / 2020'}
          showLogo={false}
        />
        <FlightListItemWithTitle
          title={'Dönüş Biletiniz'}
          subTitle={'16 / 11 / 2020'}
          showLogo={false}
        />
      </Block>
      <AppButton
        style={styles.btn}
        title={'Rezervasyon Yap'}
        onPress={() => setSubmitPopUpVisible(true)}
      />
      <SubmitRezPopUp
        isVisible={submitPopUpVisible}
        hideModal={() => {
          setSubmitPopUpVisible(false);
        }}
        onYes={() => {
          console.log('done');
        }}
      />
    </Block>
  );
};

export default BusRezScreen;

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
  },
});
