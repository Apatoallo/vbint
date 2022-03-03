import React, { useState } from 'react';
import { Image } from 'react-native';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/FloatingTextInput';
import { Block, Text } from '../../components/AppTheme';
import FullScreenImage from '../../components/login/FullScreenImage';
import useApi from '../../hooks/useApi';
import BlockWithBlur from '../../components/login/BlockWithBlur';
import { Formik } from 'formik';
import { AppleUserSchema } from '../../utils/ValidationSchemas';
import MessagePopup from '../../components/MessagePopup';
import AppAlert from '../../utils/AppAlert';
import login from '../../api/login';
import routes from '../../navigation/routes';

function RegisterAppleScreen({ route, navigation }) {
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const doSocialRegisterAPI = useApi(login.doSocialLogin);

  const doSocialRegister = async (values) => {
    /**
     * Apple ile kayıt işlemi gerçekleştirilir.
     */
    const result = await doSocialRegisterAPI.request({
      ...values,
      id: route.params.userID,
      token: route.params.token,
      type: route.params.type,
    });
    if (result.ok) {
      setMessagePopupVisible({
        isVisible: true,
        title: 'Başarılı',
        subTitle: result.data.message,
      });
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          doSocialRegister(values);
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  return (
    <FullScreenImage scroll isLoading={doSocialRegisterAPI.loading}>
      <Block flex={0} center marginTop={32}>
        <Image source={require('../../assets/images/logo.png')} />
      </Block>
      <BlockWithBlur>
        <Formik
          initialValues={{
            firstName: route.params ? route.params.firstName : '',
            lastName: route.params ? route.params.lastName : '',
          }}
          onSubmit={async (values, { setErrors }) => {
            let errorList = await doSocialRegister(values);
            if (errorList) {
              setErrors(errorList);
            }
          }}
          validationSchema={AppleUserSchema}>
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
            <>
              <Text bold center margin={16} size={18}>
                Apple Üyelik
              </Text>
              <Block flex={0} margin={[0, 16, 0, 16]}>
                <AppTextInput
                  title={'Adınız'}
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  errors={
                    touched.firstName && errors.firstName
                      ? errors?.firstName
                      : []
                  }
                  onBlur={() => setFieldTouched('firstName')}
                />
                <AppTextInput
                  title={'Soyadınız'}
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  errors={
                    touched.lastName && errors.lastName ? errors?.lastName : []
                  }
                  onBlur={() => setFieldTouched('lastName')}
                />
                <AppButton
                  marginTop={16}
                  title={'ÜYE OL'}
                  onPress={handleSubmit}
                />
              </Block>
            </>
          )}
        </Formik>
      </BlockWithBlur>
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
          navigation.navigate(routes.LOGIN_STACK, {
            screen: routes.SING_IN,
          });
        }}
      />
    </FullScreenImage>
  );
}

export default RegisterAppleScreen;
