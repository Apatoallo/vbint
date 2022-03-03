import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Block, Text } from '../../components/AppTheme/index';
import colors from '../../config/colors';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import HeaderTitle from '../../components/HeaderTitle';
import { useTranslation } from 'react-i18next';
import StoreData from '../../utils/StoreData';
import LanguageSelector from '../../components/settings/LanguageSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Language = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    getStoredLang();
  }, []);
  const getStoredLang = async () => {
    const lang = await AsyncStorage.getItem('lang');
    console.log(lang);
    setLanguages([
      { title: 'English', id: 'en', selected: lang === 'en' },

      { title: 'Türkçe', id: 'tr', selected: lang === 'tr' },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: AppStyles.headerWithoutShadow,
      headerTitle: (props) => (
        <HeaderTitle title={t('language_settings')} {...props} />
      ),
      headerBackTitle: ' ',
      headerTitleAlign: 'center',
      headerBackImage: () => <BackIcon />,
    });
  }, [navigation]);

  return (
    <Block padding={16} white>
      <Text
        marginBottom={30}
        size={14}
        color={colors.hotelCardLightGrey}></Text>
      <Block>
        <LanguageSelector
          onSelect={(item) => {
            StoreData.storeData('lang', item.id);
            i18n.changeLanguage(item.id);
          }}
          list={languages}
        />
      </Block>
    </Block>
  );
};

export default Language;
