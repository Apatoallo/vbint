import React from 'react';
import { Block, Text } from '../AppTheme';
import colors from '../../config/colors';

const NotificationType1 = ({ title, text, date }) => {
  return (
    <Block margin>
      <Text color={colors.notifBlack}>
        ‘’
        <Text bold color={colors.primary}>
          {title}
        </Text>
        ’’ {text}
      </Text>
      <Text medium color={colors.blackGrey} marginTop size={14}>
        {date}
      </Text>
    </Block>
  );
};

export default NotificationType1;
