import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import CheckBoxListİtem from './CheckBoxListİtem';
import AppButton from './AppButton';
import IconWithClick from './IconWithClick';
import colors from '../config/colors';
import SortListItem from './SortListItem';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

const FilterModal = ({ isVisible, hideModal, onApply }) => {
  const { t } = useTranslation();
  const closeIcon = {
    type: 'materialCommunity',
    name: 'close',
    size: 25,
    color: colors.black,
  };
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      onBackdropPress={hideModal}
      onRequestClose={hideModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe>
      <Block flex={0} style={styles.block}>
        <Block radius={10}>
          <Block
            white
            scroll
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <Block row paddingRight={20} center marginBottom>
              <Text
                size={22}
                medium
                padding
                marginLeft
                style={styles.filterTitle}>
                {t('filters')}
              </Text>
              <IconWithClick
                {...closeIcon}
                onPress={() => {
                  hideModal();
                }}
                style={styles.closeIcon}
              />
            </Block>

            <CheckBoxListİtem
              title={'Kategori'}
              itemList={[
                { title: 'Oteller', selected: false, id: 1 },
                { title: 'Mekanlar', selected: false, id: 2 },
                { title: 'Etkinlikler', selected: false, id: 3 },
                { title: 'Gezi ve turlar', selected: false, id: 4 },
                { title: 'Tekne ve yat kiralama', selected: false, id: 5 },
              ]}
            />
            <SortListItem
              title={'Sırala'}
              itemList={[
                { title: 'En yeni', selected: false, id: 1 },
                { title: 'En eski', selected: false, id: 2 },
              ]}
              setSelectedItem={(item) => {}}
            />

            <Block margin={16} row style={styles.applyBlock}>
              <AppButton
                shadow
                flex
                title={'Uygula'}
                marginLeft
                onPress={() => {
                  hideModal();
                  onApply();
                }}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  applyBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  block: {
    height: '70%',
    marginTop: 'auto',
  },
  contentContainer: {
    paddingTop: 25,
    paddingBottom: Dimensions.get('window').height * 0.1,
  },
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  filterTitle: {
    flex: 1,
  },
});
