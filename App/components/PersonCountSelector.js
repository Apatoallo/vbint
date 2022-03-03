import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Block, Text, Icon } from './AppTheme';
import { IconTypes } from './AppTheme/Icon';
import colors from '../config/colors';

const PersonCountSelector = ({
  title,
  titleSize = 20,
  subTitle,
  name,
  updateCount,
  marginHorizontal = 16,
  marginBottom = 0,
  max = 100,
  ...rest
}) => {
  const [count, setCount] = useState(0);
  return (
    <View
      style={[
        styles.viewStyle,
        { marginHorizontal: marginHorizontal, marginBottom: marginBottom },
      ]}>
      <Text bold size={titleSize}>
        {title}
      </Text>
      <Block
        marginTop
        marginBottom
        noFlex
        center
        padding={10}
        style={styles.border}
        space={'between'}
        row>
        <Text color={'#5191FA'}>
          {count} {name}
        </Text>
        <Block noFlex row>
          <TouchableOpacity
            onPress={() => {
              setCount(count !== 0 ? count - 1 : 0);
              updateCount(count !== 0 ? count - 1 : 0);
            }}>
            <Block marginRight>
              <Icon
                type={IconTypes.antdesign}
                name={'minuscircle'}
                color={count > 0 ? colors.secondary : colors.lightGray}
                size={30}
              />
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (count < max) {
                setCount(count + 1);
                updateCount(count + 1);
              }
            }}>
            <Icon
              type={IconTypes.antdesign}
              name={'pluscircle'}
              color={colors.secondary}
              size={30}
            />
          </TouchableOpacity>
        </Block>
      </Block>
      <Text medium size={14} color={'#909090'}>
        {subTitle}
      </Text>
    </View>
  );
};

export default PersonCountSelector;

const styles = StyleSheet.create({
  border: {
    borderColor: colors.inputBorder,
    borderRadius: 12,
    borderWidth: 0.5,
  },
  viewStyle: {
    backgroundColor: colors.white,
  },
});
