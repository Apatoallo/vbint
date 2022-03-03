import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Block, Text } from '../AppTheme';
import Modal from 'react-native-modal';
import IconWithClick from '../IconWithClick';
import CheckBoxRoomListItem from './CheckBoxRoomListItem';
import { useTranslation } from 'react-i18next';

const RoomsListSelector = ({
  isVisible,
  onClose,
  onSelect,

  list,
}) => {
  const { t } = useTranslation();
  const [roomsList, setRoomsList] = useState(list);
  useEffect(() => {
    setRoomsList(list);
  }, [list]);
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      onBackdropPress={onClose}
      onRequestClose={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe>
      <SafeAreaView>
        <Block flex={0} style={styles.block}>
          <Block white marginTop padding>
            <IconWithClick
              type={'fontAwesome'}
              name={'angle-left'}
              color="gray"
              size={30}
              style={styles.icon}
              onPress={() => {
                onClose();
              }}
            />
            <Text bold margin size={20}>
              {t('available_rooms')}
            </Text>
            <Block>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.navigationList}
                data={roomsList}
                renderItem={({ item }) => (
                  <CheckBoxRoomListItem
                    item={item}
                    onSelectItem={(room) => {
                      onSelect(item);
                    }}
                  />
                )}
                keyExtractor={(item) => item.index}
              />
            </Block>
          </Block>
        </Block>
      </SafeAreaView>
    </Modal>
  );
};

export default RoomsListSelector;

const styles = StyleSheet.create({
  block: {
    height: '100%',
    marginTop: 'auto',
  },
});
