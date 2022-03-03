import React from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { IconTypes, Icon } from '../../components/AppTheme/Icon';
import colors from '../../config/colors';
import ListsItems from '../../config/ListsItems';
import Separator from '../../components/Separator';
import { useTranslation } from 'react-i18next';

const SearchScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const [text, onChangeText] = React.useState(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'left',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,

      headerTitle: (props) => (
        <Block>
          <TextInput
            returnKeyType={'search'}
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={t('where')}
          />
        </Block>
      ),
    });
  }, [navigation]);
  return (
    <Block white>
      <TouchableOpacity>
        <Block marginTop flex={0} color={'#E3EEFE'} row center padding>
          <Icon
            name={'location'}
            type={IconTypes.evilicon}
            size={24}
            color={colors.black}
            marginRight
            marginLeft
          />
          <Text marginLeft>{t('discovery')}</Text>
        </Block>
      </TouchableOpacity>
      <Block>
        <Text bold size={16} margin paddingLeft>
          {t('browse_category')}
        </Text>
        <Block marginLeft marginRight>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={ListsItems.mainPage}
            ItemSeparatorComponent={Separator}
            renderItem={(item) => (
              <Block margin>
                <Text>{t('hotels')}</Text>
              </Block>
            )}
            keyExtractor={(item) => item.index}
          />
        </Block>
      </Block>
    </Block>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: { fontFamily: 'Montserrat-Regular' },
});
