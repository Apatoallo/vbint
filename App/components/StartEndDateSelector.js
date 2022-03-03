import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme';
import Modal from 'react-native-modal';
import Calendar from './tour/Calendar';
import { useTranslation } from 'react-i18next';

const StartEndDateSelector = ({
  title = '',
  isVisible,
  onClose,
  onSelect,
  showRemove = false,
  onRemove,
  allowRangeSelection = false,
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
        <Text white size={24} bold margin={16}>
          {title}
        </Text>
        <Block white marginTop padding radius={16}>
          <Calendar
            allowRangeSelection={allowRangeSelection}
            onSave={({ startDate, endDate }) => {
              onSelect({ startDate, endDate });
            }}
          />
          {showRemove && (
            <Text bold center marginBottom onPress={onRemove}>
              {t('delete')}
            </Text>
          )}
        </Block>
      </Block>
    </Modal>
  );
};

export default StartEndDateSelector;

const styles = StyleSheet.create({
  block: {
    height: Dimensions.get('screen').height * 0.65,
    marginTop: 'auto',
  },
});
