import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import CheckBoxListİtem from '../../components/CheckBoxListİtem';
import AppButton from '../../components/AppButton';
import colors from '../../config/colors';
import SortListItem from '../../components/SortListItem';
import PriceRangeSelector from '../../components/hotelSearch/PriceRangeSelector';
import { useTranslation } from 'react-i18next';

const EventFiltersScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState(route?.params?.filters);
  const [sortBy, setSortBy] = useState(null);
  const [priceMinMax, setPriceMinMax] = useState({
    min: filters?.priceRange?.minPrice,
    max: filters?.priceRange?.maxPrice,
  });
  return (
    <Block>
      <Block
        white
        scroll
        contentContainerStyle={{
          paddingBottom: Dimensions.get('window').height * 0.1,
        }}>
        <Text size={22} bold padding>
          {t('filtering')}
        </Text>
        {filters?.categories && (
          <CheckBoxListİtem
            updateItem={(item) => {
              setFilters({
                ...filters,
                categories: [
                  ...filters.categories.map((i) => {
                    return item.id === i.id ? item : i;
                  }),
                ],
              });
            }}
            title={t('category')}
            itemList={filters.categories}
          />
        )}
        {filters.orders && (
          <SortListItem
            title={t('sort')}
            itemList={filters.orders.map((item, index) => {
              return { ...item, id: index };
            })}
            setSelectedItem={(item) => {
              setSortBy({ orders: item.value });
            }}
          />
        )}
        {filters.priceRange && (
          <Block marginBottom={16}>
            <Block flex={0} color={colors.titleBg} padding={16}>
              <Text medium size={18}>
                {t('price_range')}
              </Text>
            </Block>
            <PriceRangeSelector
              minValue={filters.priceRange.minPrice}
              maxValue={filters.priceRange.maxPrice}
              onChange={(low, high) => {
                setPriceMinMax({ min: low, max: high });
              }}
            />
          </Block>
        )}

        {filters?.features && (
          <CheckBoxListİtem
            updateItem={(item) => {
              setFilters({
                ...filters,
                features: [
                  ...filters.features.map((i) => {
                    return item.id === i.id ? item : i;
                  }),
                ],
              });
            }}
            title={t('business_opportunities')}
            itemList={filters.features}
          />
        )}

        {filters.stars && (
          <CheckBoxListİtem
            title={t('evaluation_score')}
            itemList={filters.stars}
            updateItem={(item) => {
              setFilters({
                ...filters,
                stars: [
                  ...filters.stars.map((i) => {
                    return item.value === i.value ? item : i;
                  }),
                ],
              });
            }}
          />
        )}
      </Block>

      <Block margin={16} row style={styles.applyBlock}>
        <AppButton
          flex
          title={t('reset')}
          marginRight
          backgroundColor={colors.secondGray}
          textColor={colors.black}
          shadow
          onPress={() => {
            route.params.onDeleteAll();
            navigation.goBack();
          }}
        />
        <AppButton
          shadow
          flex
          title={t('apply')}
          marginLeft
          onPress={() => {
            route.params.onReturn({
              categories: filters?.categories
                ?.filter((item) => item.selected)
                ?.map((item) => item.id),
              features: filters?.features
                ?.filter((item) => item.selected)
                ?.map((item) => item.id),
              stars: filters?.stars
                ?.filter((item) => item.selected)
                ?.map((item) => item.value),
              priceMin: priceMinMax.min,
              priceMax: priceMinMax.max,
              ...sortBy,
            });
            navigation.goBack();
          }}
        />
      </Block>
    </Block>
  );
};

export default EventFiltersScreen;

const styles = StyleSheet.create({
  applyBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
