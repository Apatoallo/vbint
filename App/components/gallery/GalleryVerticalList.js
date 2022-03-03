import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import AppButton from '../AppButton';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import GalleryVerticalListItem from './GalleryVerticalListItem';
import { useTranslation } from 'react-i18next';

const GalleryVerticalList = ({ onSeeAllPress, onPress, title = '', data }) => {
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
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{
          padding: 16,
        }}
        style={styles.list}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <GalleryVerticalListItem
              url={item.url}
              onPress={() => {
                onPress({ item, index });
              }}
              title={item.title}
              image={item.link}
              description={item.description}
            />
          );
        }}
        keyExtractor={(item) => item.index}
      />
    </Block>
  );
};

export default GalleryVerticalList;

const styles = StyleSheet.create({});
