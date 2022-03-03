import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from './AppTheme/index';
import colors from '../config/colors';

const RatingBox = ({ rating, ...rest }) => {
  return rating > 0 ? (
    <Block noflex style={styles.ratting} {...rest}>
      <Block
        noflex
        borderRadius={10}
        color={colors.lightGray}
        width={40}
        height={40}
        center
        middle>
        <Text size={14} center bold>
          {rating}
        </Text>
      </Block>
    </Block>
  ) : (
    <Block noflex style={styles.ratting} {...rest}>
      <Block
        noflex
        borderRadius={10}
        color={colors.white}
        width={40}
        height={40}
        center
        middle>
        <Text size={14} white center bold>
          {rating}
        </Text>
      </Block>
    </Block>
  );
};

export default RatingBox;

const styles = StyleSheet.create({
  ratting: {
    alignSelf: 'flex-end',
  },
});
