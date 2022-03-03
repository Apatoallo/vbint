import React from 'react';
import { ScrollView } from 'react-native';
import { Block, Text } from '../components/AppTheme/index';
import colors from '../config/colors';

const About = ({ route, navigation }) => {
  const { title, subTitle, hideHeader } = route.params;
  return (
    <Block padding={16} white>
      {!hideHeader && (
        <Text notera marginBottom marginLeft color={colors.lightGray} size={50}>
          {title}
        </Text>
      )}
      <Text marginBottom title bold weight={'500'}>
        {title}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>{subTitle}</Text>
      </ScrollView>
    </Block>
  );
};

export default About;
