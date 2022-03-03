import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import AppButton from '../../components/AppButton';
import SingleDateSelector from '../../components/SingleDateSelector';
import moment from 'moment';
import HeaderTitle from '../../components/HeaderTitle';
import SettingsInfoItem from '../../components/settings/SettingsInfoItem';
import useApi from '../../hooks/useApi';
import profile from '../../api/profile';
import MessagePopup from '../../components/MessagePopup';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import AppAlert from '../../utils/AppAlert';

const UserBirthDate = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { user } = route.params;

  const [birthDate, setBirthDate] = useState(
    user.birthDay ? new Date(user.birthDay) : null,
  );
  const [calendarVisible, setCalendarVisible] = useState(false);
  const updateProfileApi = useApi(profile.updateProfile);
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });

  const updateProfile = async () => {
    const result = await updateProfileApi.request({
      birthDay: moment(birthDate).format('YYYY-MM-DD'),
    });
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          navigation.goBack();
        },
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => <HeaderTitle title={t('birthday')} {...props} />,
      headerBackTitle: ' ',
      headerTitleAlign: 'center',
      headerBackImage: () => <BackIcon />,
      headerRight: () => (
        <AppButton
          paddingRight={16}
          title={t('save')}
          textOnly
          textColor={colors.black}
          onPress={() => {
            updateProfile();
          }}
        />
      ),
    });
  }, [navigation, birthDate]);

  return (
    <Block padding={16} scroll white>
      <Text marginBottom={30} size={14} color={colors.hotelCardLightGrey}>
        {
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius.'
        }
      </Text>
      <SettingsInfoItem
        title={t('birthday_low')}
        text={birthDate ? moment(birthDate).calendar() : t('choose')}
        isEdit
        onPressEditIcon={() => {
          setCalendarVisible(true);
        }}
      />
      <SingleDateSelector
        isVisible={calendarVisible}
        title={t('choose_birthday')}
        backDate
        nextDate
        onSelect={(date) => {
          setCalendarVisible(false);
          console.log(date);
          setBirthDate(date);
        }}
        onClose={() => {
          setCalendarVisible(false);
        }}
      />
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
          navigation.goBack();
        }}
      />
      <LoadingIndicator visible={updateProfileApi.loading} />
    </Block>
  );
};

export default UserBirthDate;

const styles = StyleSheet.create({
  editIcon: {
    marginLeft: 10,
  },
  dateText: {
    flex: 1,
  },
});
