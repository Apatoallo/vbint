import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Dimensions, Platform } from 'react-native';
import register from '../../api/register';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/FloatingTextInput';
import { Block, Text } from '../../components/AppTheme';
import FullScreenImage from '../../components/login/FullScreenImage';
import useApi from '../../hooks/useApi';
import BlockWithBlur from '../../components/login/BlockWithBlur';
import { Formik } from 'formik';
import { RegularUserSchema } from '../../utils/ValidationSchemas';
import LoginCheckbox from '../../components/login/LoginCheckbox';
import SocialButton from '../../components/SocialButton';
import { IconTypes } from '../../components/AppTheme/Icon';
import routes from '../../navigation/routes';
import MessagePopup from '../../components/MessagePopup';
import { useTranslation } from 'react-i18next';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import AppAlert from '../../utils/AppAlert';
import login from '../../api/login';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  Profile,
  LoginManager,
  AccessToken,
  Settings,
  LoginButton,
} from 'react-native-fbsdk-next';
import storage from '../../auth/storage';
import { StackActions } from '@react-navigation/routers';
import { useAuthReducer } from '../../reducers/authReducer';

function Register({ navigation }) {
  const { t } = useTranslation();
  const [messagePopupVisible, setMessagePopupVisible] = useState({
    isVisible: false,
    title: '',
    subTitle: '',
  });
  const newUserApi = useApi(register.registerNewUser);
  const doSocialRegisterAPI = useApi(login.doSocialLogin);
  const { setLogin } = useAuthReducer();

  const registerNewUser = async (values) => {
    const result = await newUserApi.request(values);

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

  const doSocialRegister = async (values) => {
    /**
     * Sosyal ağ ile giriş işlemini gerçekleştirir.
     */
    const result = await doSocialRegisterAPI.request(values);
    if (result.ok) {
      if (result.status == 410) {
        navigation.navigate(routes.REGISTER_APPLE_SCREEN, {
          userID: values.id,
          token: values.token,
          type: values.type,
        });
      } else {
        storage.storeToken(result.data.data.apiToken);
        setLogin(result.data.data);
        navigation.dispatch(StackActions.replace(routes.HOME_PAGE));
      }
    } else {
      AppAlert.errorAlert({
        onOk: () => {
          doSocialRegister(values);
        },
        okText: 'Tekrar Dene',
      });
    }
  };

  async function onAppleButtonPress() {
    /**
     * Apple ile giriş işlemini gerçekleştirir.
     */
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      doSocialRegister({
        id: appleAuthRequestResponse.user,
        token: appleAuthRequestResponse.identityToken,
        type: 'apple',
      });
    }
  }
  const doGoogleLogin = async () => {
    GoogleSignin.configure();

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();

      doSocialRegister({
        type: 'google',
        id: userInfo.user.id,
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        email: userInfo.user.email,
        image: userInfo.user.photo,
        token: token.accessToken,
      });
      console.log(userInfo.user, token);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(statusCodes);
      } else {
        console.log(error);
      }
    }
  };

  const doFacebookLogin = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          getProfile();
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const getProfile = () => {
    Profile.getCurrentProfile().then(function (currentProfile) {
      if (currentProfile) {
        console.log(currentProfile);
        AccessToken.getCurrentAccessToken().then((data) => {
          doSocialRegister({
            type: 'facebook',
            id: currentProfile.userID,
            firstName: currentProfile.firstName,
            lastName: currentProfile.lastName,
            email: currentProfile.email,
            image: currentProfile.imageURL,
            token: data.accessToken.toString(),
          });
        });
      }
    });
  };
  useEffect(() => {
    Settings.initializeSDK();
  }, []);
  return (
    <FullScreenImage
      scroll
      isLoading={newUserApi.loading || doSocialRegisterAPI.loading}>
      <Block flex={0} center marginTop={32}>
        <Image source={require('../../assets/images/logo.png')} />
      </Block>
      <BlockWithBlur>
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            password_confirmation: '',
            phone: '',
            information_text: false,
          }}
          onSubmit={async (values, { setErrors }) => {
            let errorList = await registerNewUser(values);
            if (errorList) {
              setErrors(errorList);
            }
          }}
          validationSchema={RegularUserSchema}>
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
                {t('individual_membership')}
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
                <AppTextInput
                  keyboardType={'email-address'}
                  title={'E-posta adresiniz'}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  errors={touched.email && errors.email ? errors?.email : []}
                  onBlur={() => setFieldTouched('email')}
                />
                <AppTextInput
                  keyboardType={'phone-pad'}
                  title={'Telefon'}
                  isPhone
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  errors={touched.phone && errors.phone ? errors?.phone : []}
                  onBlur={() => setFieldTouched('phone')}
                />
                <AppTextInput
                  isPassword={true}
                  title={'Şifre'}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  errors={
                    touched.password && errors.password ? errors?.password : []
                  }
                  onBlur={() => setFieldTouched('password')}
                />
                <AppTextInput
                  isPassword={true}
                  title={'Şifre Tekrar'}
                  value={values.password_confirmation}
                  onChangeText={handleChange('password_confirmation')}
                  errors={
                    touched.password_confirmation &&
                    errors.password_confirmation
                      ? errors?.password_confirmation
                      : []
                  }
                  onBlur={() => setFieldTouched('password_confirmation')}
                />
              </Block>

              <Block margin={16} flex={0}>
                <LoginCheckbox
                  title={
                    'Bireysel Üyelik Bilgilendirme Metni’ni okudum, anladım.'
                  }
                  onChange={(status) => {
                    console.log(errors);
                    setFieldValue('information_text', status);
                  }}
                  errors={
                    touched.information_text && errors.information_text
                      ? errors?.information_text
                      : []
                  }
                />
                <AppButton marginTop title={t('sign_up')} onPress={handleSubmit} />
              </Block>
              <Block>
                <Text bold center>
                  Veya
                </Text>
              </Block>
            </>
          )}
        </Formik>
        <Block row margin>
          <Block>
            <SocialButton
              title={'Facebook'}
              iconName={'sc-facebook'}
              onPress={doFacebookLogin}
              small
            />
          </Block>
          <Block>
            <SocialButton
              title={'google'}
              iconName={'google'}
              type={IconTypes.antdesign}
              onPress={doGoogleLogin}
              small
            />
          </Block>
        </Block>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE_OUTLINE}
            buttonType={AppleButton.Type.SIGN_UP}
            style={styles.appleButton}
            onPress={() => onAppleButtonPress()}
          />
        )}
      </BlockWithBlur>
      <MessagePopup
        isVisible={messagePopupVisible.isVisible}
        title={messagePopupVisible.title}
        subTitle={messagePopupVisible.subTitle}
        hideModal={() => {
          setMessagePopupVisible({ isVisible: false });
          navigation.pop(2);
        }}
      />
    </FullScreenImage>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    height: '100%',
  },
  appleButton: {
    marginHorizontal: 16,
    width: Dimensions.get('window').width - 64,
    height: 45,
  },
});

export default Register;
