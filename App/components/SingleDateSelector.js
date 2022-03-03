import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import Modal from 'react-native-modal';
import Calendar from './tour/Calendar';
import { useTranslation } from 'react-i18next';

const SingleDateSelector = ({
  title = '',
  isVisible,
  onClose,
  onSelect,
  backDate,
  nextDate,
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      isVisible={isVisible}
      style={{ margin: 0 }}
      onBackdropPress={onClose}
      onRequestClose={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      propagateSwipe>
      <Block flex={0} style={styles.block}>
        <Text margin white size={24} bold>
          {title}
        </Text>
        <Block white marginTop padding radius={16}>
          <Calendar
            allowRangeSelection={false}
            backDate={backDate}
            nextDate={nextDate}
            onSave={({ startDate }) => {
              onSelect(startDate);
            }}
          />
        </Block>
      </Block>
    </Modal>
  );
};

export default SingleDateSelector;

const styles = StyleSheet.create({
  block: {
    height: '70%',
    marginTop: 'auto',
  },
});
