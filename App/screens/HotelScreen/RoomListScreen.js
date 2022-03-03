import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text } from '../../components/AppTheme/index';
import RoomListItem from '../../components/hotelSearch/RoomListItem';
import { useTranslation } from 'react-i18next';

const RoomListScreen = ({ route }) => {
  const { t } = useTranslation();
  const { list } = route.params;
  return (
    <Block white>
      <Text bold size={18} margin>
        {t('rooms')}
      </Text>
      <Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={styles.navigationList}
          data={list}
          renderItem={({ item }) => (
            <Block margin={[8, 16, 8, 16]}>
              <RoomListItem item={item} onPress={() => {}} />
            </Block>
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
    </Block>
  );
};

export default RoomListScreen;

const styles = StyleSheet.create({});
