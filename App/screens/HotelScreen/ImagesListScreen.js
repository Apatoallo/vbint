import React from 'react';
import { StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import ListsItems from '../../config/ListsItems';
import AppStyles from '../../config/AppStyles';
import { useTranslation } from 'react-i18next';

const ImagesListScreen = () => {
  const { t } = useTranslation();
  return (
    <Block white>
      <Text bold size={18} margin>
        {t('gallery')}
      </Text>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={ListsItems.mainPage}
          renderItem={(item) => (
            <Block
              margin={[8, 16, 8, 16]}
              radius={16}
              style={AppStyles.overflow}>
              <Image
                style={[styles.image, AppStyles.overflow]}
                source={require('../../assets/images/10yer.jpeg')}
              />
            </Block>
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
    </Block>
  );
};

export default ImagesListScreen;

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('screen').width / 2.4,
    height: 120,
    resizeMode: 'cover',
  },
});
