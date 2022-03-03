import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppButton from '../../components/AppButton';
import FullScreenImage from '../../components/login/FullScreenImage';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import BlockWithBlur from '../../components/login/BlockWithBlur';
import { useTranslation } from 'react-i18next';

function RegisterType({ navigation }) {
  const { t } = useTranslation();
  return (
    <FullScreenImage>
      <Block flex={0} center marginTop={32}>
        <Image source={require('../../assets/images/logo.png')} />
      </Block>
      <BlockWithBlur>
        <Text bold center margin={16} size={18}>
          {t('sign_up')}
        </Text>
        <Block margin={16}>
          <AppButton
            title={t('individual_membership')}
            onPress={() => {
              navigation.navigate(routes.REGISTER);
            }}
          />
          <AppButton
            textColor={colors.black}
            backgroundColor={colors.white}
            borderWidth={0.5}
            borderColor={colors.black}
            marginTop={16}
            title={t('corporate_membership')}
            onPress={() => {
              navigation.navigate(routes.REGISTER_COMPANY);
            }}
          />
        </Block>
      </BlockWithBlur>
    </FullScreenImage>
  );
}

const styles = StyleSheet.create({});

export default RegisterType;
