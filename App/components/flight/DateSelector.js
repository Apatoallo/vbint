import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import { Icon, IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import StartEndDateSelector from '../StartEndDateSelector';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const DateSelector = ({
  title,
  subTitle,
  itemsList,
  onChangeDate,
  ...rest
}) => {
  const { t } = useTranslation();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <TouchableOpacity onPress={() => setPopUpVisible(true)}>
      <Block {...rest}>
        <Text bold color={colors.semiBlack} size={18}>
          {title}
        </Text>
        <Block
          space={'between'}
          marginTop={12}
          row
          center
          style={styles.block}
          paddingBottom={16}
          paddingRight>
          <Block center row paddingLeft>
            <Icon
              type={IconTypes.feather}
              name={'calendar'}
              color={colors.hotelCardLightGrey}
              size={22}
            />
            <Text marginLeft colo={'#484848'}>
              {!selectedItem ? t('choose') : moment(selectedItem).format('LL')}
            </Text>
          </Block>
          <Icon
            type={'fontAwesome'}
            name={'angle-right'}
            color={colors.semiBlack}
            size={22}
          />
        </Block>
        <StartEndDateSelector
          title={subTitle}
          isVisible={popUpVisible}
          onClose={() => {
            setPopUpVisible(false);
          }}
          onSelect={({ startDate, endDate }) => {
            setPopUpVisible(false);
            setSelectedItem(startDate);
            onChangeDate(startDate);
          }}
          allowRangeSelection={false}
        />
      </Block>
    </TouchableOpacity>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  block: {
    borderBottomColor: colors.semiBlack,
    borderBottomWidth: 0.5,
  },
});
