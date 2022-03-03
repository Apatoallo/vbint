import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { Block, Text } from '../AppTheme';

const TabBtn = ({ onPress, selectedTab, id, title }) => {
  return (
    <Block center flex={0}>
      <TouchableOpacity onPress={onPress}>
        <Block
          style={selectedTab === id ? styles.border : null}
          flex={0}
          padding>
          <Text
            size={18}
            bold={selectedTab === id ? true : false}
            medium={selectedTab === id ? false : true}
            color={selectedTab === id ? colors.primary : colors.hotelCardGrey}>
            {title}
          </Text>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default TabBtn;

const styles = StyleSheet.create({
  border: { borderBottomWidth: 1, borderBottomColor: colors.primary },
});
