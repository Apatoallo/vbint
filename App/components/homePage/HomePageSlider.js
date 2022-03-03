import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import { FlatList } from 'react-native-gesture-handler';
import HomePageSliderItem from './HomePageSliderItem';
import HomePageListHotel from './HomePageListHotel';
import { useTranslation } from 'react-i18next';

const HomePageSlider = ({ item, onItemPress, seeAllOnPress }) => {
  const { t } = useTranslation();
  return (
    <Block>
      <Block center row space={'between'} margin={[16, 16, 8, 16]}>
        <Text bold size={18}>
          {item.title}
        </Text>
        <Text size={14} color={colors.blue} onPress={seeAllOnPress}>
          {t('see_all')}
        </Text>
      </Block>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={styles.list}
        data={item.list}
        renderItem={({ item }) => {
          switch (item.destination) {
            case 'hotels':
              return (
                <HomePageListHotel
                  onPress={() => {
                    onItemPress(item);
                  }}
                  item={item}
                  showPrice
                />
              );
            case 'cafes':
              return (
                <HomePageListHotel
                  onPress={() => {
                    onItemPress(item);
                  }}
                  item={item}
                />
              );
            case 'activities':
              return (
                <HomePageSliderItem
                  onPress={() => {
                    onItemPress(item);
                  }}
                  item={item}
                />
              );
            case 'boats':
              return (
                <HomePageSliderItem
                  onPress={() => {
                    onItemPress(item);
                  }}
                  item={item}
                  showPrice
                />
              );
            case 'tours':
              return (
                <HomePageSliderItem
                  onPress={() => {
                    onItemPress(item);
                  }}
                  item={item}
                  showPrice
                />
              );
          }
        }}
        keyExtractor={(item) => item.index}
      />
    </Block>
  );
};

export default HomePageSlider;

const styles = StyleSheet.create({
  list: {
    paddingLeft: 8,
    paddingRight: 8,
  },
});
