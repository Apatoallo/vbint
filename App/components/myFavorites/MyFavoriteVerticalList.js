import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AppButton from '../AppButton';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import MyFavoriteVerticalListItem from './MyFavoriteVerticalListItem';
import { useTranslation } from 'react-i18next';

const MyFavoriteVerticalList = ({
  onSeeAllPress,
  onPress,
  title = '',
  itemList,
}) => {
  const { t } = useTranslation();
  return (
    <Block flex={0}>
      <Block row center margin={[16, 16, 0, 16]} space={'between'}>
        <Text bold size={20}>
          {title}
        </Text>
        <AppButton
          title={t('see_all')}
          textOnly
          onPress={onSeeAllPress}
          textColor={colors.underlinedText}
          size={14}
        />
      </Block>
      <FlatList
        horizontal={true}
        contentContainerStyle={{
          padding: 16,
        }}
        style={styles.list}
        data={itemList}
        renderItem={({ item }) => (
          <MyFavoriteVerticalListItem
            onPress={() => onPress(item)}
            item={item}
          />
        )}
        keyExtractor={(item) => item.index}
      />
    </Block>
  );
};

export default MyFavoriteVerticalList;

const styles = StyleSheet.create({});
