import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import useApi from '../../hooks/useApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import MessagePopup from '../../components/MessagePopup';
import { useAuthReducer } from '../../reducers/authReducer';
import { Formik } from 'formik';
import { ReservationSchema } from '../../utils/ValidationSchemas';
import hotels from '../../api/hotels';
import { useTranslation } from 'react-i18next';

const HotelReservationPersonInfo = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { data } = route.params;
  const { userData } = useAuthReducer();

  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const [userDataReq, setUserData] = useState({
    fullName: userData.firstName + ' ' + userData.lastName,
    phone: userData.phone,
    email: userData.email,
    description: null,
  });

  const doReservationApi = useApi(hotels.doHotelReservation);

  const doCafeReservation = async (q) => {
    const result = await doReservationApi.request({
      ...q,
      ...data,
    });

    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: t('successful'),
        subTitle: result.data.message,
      });
    } else {
      return result.data.errorList;
    }
  };
  return (
    <Block scroll padding={16} white>
      <Formik
        initialValues={{
          fullName: userData.firstName + ' ' + userData.lastName,
          phone: userData.phone,
          email: userData.email,
          description: '',
        }}
        onSubmit={async (values, { setErrors }) => {
          let errorList = await doCafeReservation(values);
          if (errorList) {
            setErrors(errorList);
          }
        }}
        validationSchema={ReservationSchema}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
          setFieldValue,
        }) => (
          <Block>
            <Text bold title marginBottom={20}>
              {t('fill_form')}
            </Text>
            <AppTextInput
              title={t('full_name')}
              value={values.fullName}
              marginBottom={15}
              onChangeText={handleChange('fullName')}
              errors={
                touched.fullName && errors.fullName ? errors?.fullName : []
              }
              onBlur={() => setFieldTouched('fullName')}
            />
            <AppTextInput
              title={t('phone')}
              keyboardType={'numeric'}
              value={values.phone}
              marginBottom={15}
              onChangeText={handleChange('phone')}
              errors={touched.phone && errors.phone ? errors?.phone : []}
              onBlur={() => setFieldTouched('phone')}
            />
            <AppTextInput
              title={t('email')}
              keyboardType={'email-address'}
              value={values.email}
              marginBottom={15}
              onChangeText={handleChange('email')}
              errors={touched.email && errors.email ? errors?.email : []}
              onBlur={() => setFieldTouched('email')}
            />
            <AppTextInput
              title={t('description')}
              multiline={true}
              value={values.description}
              marginBottom={15}
              onChangeText={handleChange('description')}
              errors={
                touched.description && errors.description
                  ? errors?.description
                  : []
              }
              onBlur={() => setFieldTouched('description')}
            />
            <Block>
              <AppButton
                marginTop={32}
                title={t('send_reservation')}
                onPress={handleSubmit}
              />
            </Block>
            <LoadingIndicator visible={doReservationApi.loading} />
            <MessagePopup
              isVisible={messagePopupVisible.isVisible}
              title={messagePopupVisible.title}
              subTitle={messagePopupVisible.subTitle}
              hideModal={() => {
                setMessagePopupVisible({ isVisible: false });
                navigation.pop(2);
              }}
            />
          </Block>
        )}
      </Formik>
    </Block>
  );
};

export default HotelReservationPersonInfo;

const styles = StyleSheet.create({
  circleContainer: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
