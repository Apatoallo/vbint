import React, { useEffect } from 'react';
import { StyleSheet, Image, Dimensions, Platform } from 'react-native';
import AppButton from '../../components/AppButton';
import AppAlert from '../../utils/AppAlert';
import AppTextInput from '../../components/FloatingTextInput';
import { Block, Text } from '../../components/AppTheme';
import FullScreenImage from '../../components/login/FullScreenImage';
import BlockWithBlur from '../../components/login/BlockWithBlur';
import useApi from '../../hooks/useApi';
import login from '../../api/login';
import { Formik } from 'formik';
import { LoginSchema } from '../../utils/ValidationSchemas';
import SocialButton from '../../components/SocialButton';
import { IconTypes } from '../../components/AppTheme/Icon';
import routes from '../../navigation/routes';
import { StackActions } from '@react-navigation/native';
import { useAuthReducer } from '../../reducers/authReducer';
import storage from '../../auth/storage';
import { useTranslation } from 'react-i18next';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
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

function SignIn({ navigation }) {
  const { t } = useTranslation();
  // useApi
  const doLogin = useApi(login.doLogin);
  const doSocialLoginAPI = useApi(login.doSocialLogin);
  // redux
  const { setLogin } = useAuthReducer();

  const doUserLogin = async (values) => {
    const result = await doLogin.request(values);

    if (result.ok) {
      storage.storeToken(result.data.data.apiToken);
      setLogin(result.data.data);
      navigation.dispatch(StackActions.replace(routes.HOME_PAGE));
    } else {
      const error = {
        email: [result.data.message],
        password: [result.data.message],
      };

      return error;
    }
  };

  const doSocialLogin = async (values) => {
    /**
     * Sosyal ağ ile giriş işlemini gerçekleştirir.
     */
    const result = await doSocialLoginAPI.request(values);
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
          doSocialLogin(values);
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
      doSocialLogin({
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

      doSocialLogin({
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
          doSocialLogin({
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
    <FullScreenImage isLoading={doLogin.loading || doSocialLoginAPI.loading}>
      <Block scroll>
        <Block flex={0} center marginTop={32}>
          <Image source={require('../../assets/images/logo.png')} />
        </Block>
        <BlockWithBlur>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values, { setErrors }) => {
              let errorList = await doUserLogin(values);
              console.log(errorList);
              if (errorList) {
                setErrors(errorList);
              }
            }}
            validationSchema={LoginSchema}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <>
                <Text bold center margin={16} size={18}>
                  {t('login')}
                </Text>
                <Block margin={[0, 16, 0, 16]}>
                  <AppTextInput
                    keyboardType={'email-address'}
                    title={t('email')}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    errors={touched.email && errors.email ? errors?.email : []}
                    onBlur={() => setFieldTouched('email')}
                  />

                  <AppTextInput
                    isPassword={true}
                    title={t('your_password')}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    errors={
                      touched.password && errors.password
                        ? errors?.password
                        : []
                    }
                    onBlur={() => setFieldTouched('email')}
                  />
                  <Block marginTop style={styles.forgetPassword}>
                    <AppButton
                      title={t('forget_pass')}
                      textOnly
                      onPress={() => {
                        navigation.navigate(routes.RESET_PASSWORD_SCREEN);
                      }}
                    />
                  </Block>
                </Block>

                <Block margin={16} flex={0}>
                  <AppButton title={t('login')} onPress={handleSubmit} />
                </Block>
                <Block>
                  <Text bold center>
                    {t('or')}
                  </Text>
                </Block>
              </>
            )}
          </Formik>
          <SocialButton
            title={'Facebook'}
            iconName={'sc-facebook'}
            onPress={doFacebookLogin}
            margin={[0, 16, 0, 16]}
          />

          <SocialButton
            title={'google'}
            iconName={'google'}
            type={IconTypes.antdesign}
            onPress={() => {
              doGoogleLogin();
            }}
            margin={[0, 16, 0, 16]}
          />
          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE_OUTLINE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.appleButton}
              onPress={() => onAppleButtonPress()}
            />
          )}

          <Block row center middle margin={24}>
            <AppButton
              title={t('sign_up')}
              textOnly
              onPress={() => {
                navigation.navigate(routes.REGISTER_TYPE);
              }}
            />
          </Block>
        </BlockWithBlur>
      </Block>
    </FullScreenImage>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    height: '100%',
  },
  forgetPassword: {
    alignSelf: 'flex-end',
  },
  orStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  appleButton: {
    marginHorizontal: 16,
    marginTop: 6,
    width: Dimensions.get('window').width - 64,
    height: 45,
  },
});

export default SignIn;
