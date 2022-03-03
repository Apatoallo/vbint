import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import Icon, { IconTypes } from '../AppTheme/Icon';

const TicketListItem = ({ active }) => {
  return (
    <Block margin>
      <Block row center>
        <Block>
          <Text size={12} color={colors.semiBlack}>
            18/11/2020 - 21:00
          </Text>
          <Text color={active ? colors.semiBlack : colors.blackGrey} marginTop>
            <Text
              color={active ? colors.semiBlack : colors.blackGrey}
              style={active ? styles.underLine : styles.lineThrough}
              bold>
              Büyük Ev Ablukada
            </Text>{' '}
            Konser Bileti
          </Text>
        </Block>
        <Icon
          name="angle-right"
          size={24}
          color={active ? colors.semiBlack : colors.blackGrey}
          type={IconTypes.fontAwesome}
        />
      </Block>
    </Block>
  );
};

export default TicketListItem;

const styles = StyleSheet.create({
  underLine: {
    textDecorationLine: 'underline',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
});
