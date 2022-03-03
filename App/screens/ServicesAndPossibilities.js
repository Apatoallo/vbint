import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../components/AppTheme/index';
import Separator from '../components/Separator';
import colors from '../config/colors';
import { SvgCssUri } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

const ServicesAndPossibilities = ({ route }) => {
  const { t } = useTranslation();
  const { services, possibilities } = route.params;
  console.log(route);

  return (
    <Block padding={16} white scroll>
      {possibilities && (
        <Block marginBottom>
          <Text marginBottom title bold size={20}>
            {t('possibilities')}
          </Text>
          {possibilities?.map((item, index) => {
            return (
              <Block center margin row>
                <Block width={20} height={20} noflex>
                  <SvgCssUri
                    width={20}
                    height={20}
                    stroke={colors.secondary}
                    strokeWidth={1.5}
                    uri={item.icon}
                  />
                </Block>
                <Text marginLeft>{item.title}</Text>
              </Block>
            );
          })}
        </Block>
      )}
      {services && (
        <Block>
          <Text marginBottom title bold size={20}>
            {t('services')}
          </Text>
          {services?.map((item, index) => {
            return (
              <Block>
                <Block marginBottom>
                  <Text gray bold>
                    {index + 1 + '. '}
                    <Text>{item}</Text>
                  </Text>
                </Block>
                <Separator backgroundColor={colors.lightGray} marginBottom />
              </Block>
            );
          })}
        </Block>
      )}
    </Block>
  );
};

export default ServicesAndPossibilities;

const styles = StyleSheet.create({
  possibilityIcon: {
    marginRight: 10,
  },
});
