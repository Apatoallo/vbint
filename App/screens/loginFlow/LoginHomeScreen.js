import React, { useContext } from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppStyles from '../../config/AppStyles';
import routes from '../../navigation/routes';
import FullScreenImage from '../../components/login/FullScreenImage';
import AppButton from '../..//components/AppButton';
import { useTranslation } from 'react-i18next';
import { StackActions } from '@react-navigation/routers';

const LoginHomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  return (
    <FullScreenImage>
      <Block>
        <Block noflex center marginTop={32}>
          <Image source={require('../../assets/images/logo.png')} />
          <Block noflex marginTop={120}>
            <Text notera white size={80} style={[AppStyles.shadow]}>
              {t('love')}
            </Text>
            <Text medium size={26} style={styles.subTitle}>
              {t('login_home_text1')}
            </Text>
            <Text medium size={26} style={styles.subTitle}>
              {t('login_home_text2')}
            </Text>
            <Text
              marginTop
              shadow
              notera
              white
              size={100}
              style={[AppStyles.shadow]}>
              Bodrum
            </Text>
          </Block>
        </Block>
        <Block noflex style={styles.footer} marginBottom={50}>
          <AppButton
            title={t('login')}
            margin={32}
            onPress={() => {
              navigation.navigate(routes.SING_IN);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.REGISTER_TYPE);
            }}>
            <Text shadow bold size={18} white center>
              {t('sign_up')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(StackActions.replace(routes.HOME_PAGE));
            }}>
            <Text shadow bold size={18} center marginTop={32}>
              {t('go_on_without_login')}
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    </FullScreenImage>
  );
};

export default LoginHomeScreen;

const styles = StyleSheet.create({
  subTitle: { color: '#fff', textAlign: 'right' },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
