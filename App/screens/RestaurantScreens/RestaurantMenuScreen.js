import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import AppStyles from '../../config/AppStyles';
import MenuListItem from '../../components/restaurant/MenuListItem';
import ShareTool from '../../utils/ShareTool';
import { useTranslation } from 'react-i18next';

const RestaurantMenuScreen = ({ navigation, route }) => {
  const { t } = useTranslation();
  return (
    <Block white>
      <Block center row margin={16}>
        <Text bold size={20}>
          {t('menu')}
        </Text>
        <Text
          onPress={() => ShareTool.onShare(route.params.url)}
          marginLeft
          style={AppStyles.hyperLink}
          size={12}>
          {t('menu_download')}
        </Text>
      </Block>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.navigationList}
          data={route.params.list}
          renderItem={({ item }) => (
            <Block margin={[8, 16, 8, 16]}>
              <MenuListItem
                image={item.images}
                description={item.description}
                title={item.title}
                price={item.price}
                marginBottom
              />
            </Block>
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
    </Block>
  );
};

export default RestaurantMenuScreen;

const styles = StyleSheet.create({});
