import React from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import Modal from 'react-native-modal';
import colors from '../../config/colors';
import { FlatList } from 'react-native-gesture-handler';
import Separator from '../Separator';

const SelectorPopUp = ({ isVisible, hideModal, onSelect, itemsList }) => {
  return (
    <Modal
      isVisible={isVisible}
      avoidKeyboard={true}
      backdropColor={colors.black}
      backdropOpacity={0.8}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={200}
      animationOutTiming={200}
      style={{ margin: 0 }}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      onBackdropPress={() => {
        hideModal();
      }}
      onSwipeComplete={() => {
        hideModal();
      }}>
      <Block padding={16} flex={0} style={styles.block} white>
        <FlatList
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={itemsList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                onSelect(item);
                hideModal();
              }}>
              <Block padding>
                <Text medium size={18}>
                  {item.title}
                </Text>
              </Block>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.index}
          ItemSeparatorComponent={Separator}
        />
      </Block>
    </Modal>
  );
};

export default SelectorPopUp;

const styles = StyleSheet.create({
  block: {
    height: '50%',
    marginTop: 'auto',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    height: '100%',
    textAlignVertical: 'top',
    padding: 16,
  },
});
