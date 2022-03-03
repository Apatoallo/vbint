import React from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';
import { Block, Text } from '../AppTheme';
import { SvgUri } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

const HomePageNavigationItem = ({ item, onPress }) => {
  const { t } = useTranslation();
  return (
    <Block>
      <TouchableHighlight underlayColor="none" onPress={onPress}>
        <Block
          margin
          width={100}
          height={100}
          center
          middle
          shadow
          color="#f4f4f4"
          radius={8}>
          <SvgUri
            width={27}
            height={27}
            stroke={'#676767'}
            strokeWidth={1.5}
            uri={item.item.url}
          />
          <Text medium center color={'#676767'} marginTop>
            {t(item.item.name)}
          </Text>
        </Block>
      </TouchableHighlight>
    </Block>
  );
};

export default HomePageNavigationItem;

const styles = StyleSheet.create({});
