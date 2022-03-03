import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';
import Icon, { IconTypes } from '../AppTheme/Icon';

const NotificationType2 = ({ title, description, date }) => {
  return (
    <Block margin>
      <Block center row>
        <Block
          center
          middle
          style={styles.circle}
          flex={0}
          color={colors.warringColor}
          padding>
          <Icon
            type={IconTypes.antdesign}
            name={'warning'}
            color={colors.white}
            size={18}
            style={styles.icon}
          />
        </Block>
        <Block>
          <Text
            marginLeft
            color={colors.semiBlack}
            marginBottom={description ? 5 : 0}>
            {title}
          </Text>
          <Text marginLeft size={14} color={colors.semiBlack}>
            {description}
          </Text>
        </Block>
      </Block>
      <Text medium color={colors.semiBlack} marginTop size={14}>
        {date}
      </Text>
    </Block>
  );
};

export default NotificationType2;

const styles = StyleSheet.create({
  circle: {
    height: 40,
    width: 40,
    borderRadius: 1000,
  },
});
