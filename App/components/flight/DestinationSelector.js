import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Block, Text } from '../AppTheme';
import { Icon, IconTypes } from '../AppTheme/Icon';
import colors from '../../config/colors';
import SelectorPopUp from './SelectorPopUp';
import { useTranslation } from 'react-i18next';

const DestinationSelector = ({
  title,
  itemsList,
  onChangeDestination,
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
          <Block center row>
            <Icon
              type={IconTypes.evilicon}
              name={'location'}
              color={colors.hotelCardLightGrey}
              size={28}
            />
            <Text marginLeft colo={'#484848'}>
              {!selectedItem ? t('choose') : selectedItem.title}
            </Text>
          </Block>
          <Icon
            type={'fontAwesome'}
            name={'angle-right'}
            color={colors.semiBlack}
            size={22}
          />
        </Block>
        <SelectorPopUp
          itemsList={itemsList}
          isVisible={popUpVisible}
          hideModal={() => {
            setPopUpVisible(false);
          }}
          onSelect={(item) => {
            setSelectedItem(item);
            onChangeDestination(item);
          }}
        />
      </Block>
    </TouchableOpacity>
  );
};

export default DestinationSelector;

const styles = StyleSheet.create({
  block: {
    borderBottomColor: colors.semiBlack,
    borderBottomWidth: 0.5,
  },
});
