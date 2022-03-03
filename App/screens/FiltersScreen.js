import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Block, Text } from '../components/AppTheme';
import CheckBoxListİtem from '../components/CheckBoxListİtem';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import SortListItem from '../components/SortListItem';
import PriceRangeSelector from '../components/hotelSearch/PriceRangeSelector';
import AppCountSelector from '../components/AppCountSelector';
import { useTranslation } from 'react-i18next';

const FiltersScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState(route?.params?.filters);
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
        {filters?.category && (
          <CheckBoxListİtem
            updateItem={(item) => {
              setFilters({
                ...filters,
                property: [
                  ...filters.category.map((i) => {
                    return item.id === i.id ? item : i;
                  }),
                ],
              });
            }}
            title={t('category')}
            itemList={filters.category}
          />
        )}
        {filters.sort && (
          <SortListItem
            title={t('sort')}
            itemList={[
              { title: 'Otel', selected: false, id: 1 },
              { title: 'Butik Otel', selected: false, id: 2 },
              { title: 'Pansiyon', selected: false, id: 3 },
              { title: 'Tatil Köyü', selected: false, id: 4 },
              { title: 'Kamp Alanları', selected: false, id: 5 },
            ]}
            setSelectedItem={(item) => {}}
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
        {filters.person && (
          <Block marginBottom={16}>
            <Block flex={0} color={colors.titleBg} padding={16}>
              <Text medium size={18}>
                {t('rooms_beds')}
              </Text>
            </Block>
            <AppCountSelector title={t('room_count')} updateCount={() => {}} />
            <AppCountSelector title={t('bed_count')} updateCount={() => {}} />
          </Block>
        )}
        {filters.property && (
          <CheckBoxListİtem
            title={t('business_opportunities')}
            itemList={filters.property}
            updateItem={(item) => {
              setFilters({
                ...filters,
                property: [
                  ...filters.property.map((i) => {
                    return item.id === i.id ? item : i;
                  }),
                ],
              });
            }}
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
        />
        <AppButton
          shadow
          flex
          title={t('apply')}
          marginLeft
          onPress={() => {
            route.params.onReturn({
              selectedProperty: filters?.property
                ?.filter((item) => item.filtered)
                ?.map((item) => item.id),
              priceMin: priceMinMax.min,
              priceMax: priceMinMax.max,
            });
            navigation.goBack();
          }}
        />
      </Block>
    </Block>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  applyBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
