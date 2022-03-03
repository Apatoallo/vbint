import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import { Icon, IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import PassengersSelectorPopUp from './PassengersSelectorPopUp';
import { useTranslation } from 'react-i18next';

const PassengersSelector = ({ title, itemsList, onChangeSelect, ...rest }) => {
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
              type={IconTypes.ionicon}
              name={'md-person-outline'}
              color={colors.hotelCardLightGrey}
              size={22}
            />
            <Text marginLeft colo={'#484848'}>
              {!selectedItem
                ? t('choose')
                : selectedItem.adult + ' ' +
                  t('adult') + ' ' +
                  selectedItem.child + ' ' +
                  t('child')}
            </Text>
          </Block>
          <Icon
            type={'fontAwesome'}
            name={'angle-right'}
            color={colors.semiBlack}
            size={22}
          />
        </Block>
        <PassengersSelectorPopUp
          itemsList={itemsList}
          isVisible={popUpVisible}
          hideModal={() => {
            setPopUpVisible(false);
          }}
          onSelect={(value) => {
            setSelectedItem(value);
            onChangeSelect(value);
          }}
        />
      </Block>
    </TouchableOpacity>
  );
};

export default PassengersSelector;

const styles = StyleSheet.create({
  block: {
    borderBottomColor: colors.semiBlack,
    borderBottomWidth: 0.5,
  },
});
