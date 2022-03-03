import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import TourRotaListItem from '../../components/tour/TourRotaListItem';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import { useTranslation } from 'react-i18next';

const TourRoute = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { list } = route.params;

  return (
    <Block white paddingTop={16}>
      <Block row marginBottom={20} center paddingHorizontal={16}>
        <Text marginRight size={20} title bold>
          {t('tour_route')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(routes.MAP, { list: list });
          }}>
          {list && (
            <Text size={12} style={styles.showMapText}>
              {t('show_map')}
            </Text>
          )}
        </TouchableOpacity>
      </Block>
      <FlatList
        data={list}
        renderItem={({ item, index }) => {
          return (
            <TourRotaListItem
              image={item.imageSrc}
              description={item.description}
              title={item.title}
              price={item.price}
              marginBottom
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </Block>
  );
};

export default TourRoute;

const styles = StyleSheet.create({
  starIcon: {
    marginRight: 5,
  },
  campaignText: {
    flex: 1,
  },
  showMapText: {
    color: colors.underlinedText,
    textDecorationLine: 'underline',
    textDecorationColor: colors.underlinedText,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 4, // elevation için eklendi,
    paddingBottom: 16,
  },
});
