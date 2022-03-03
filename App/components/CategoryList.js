import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import components from native base
import { List, ListItem } from 'native-base';
import { Text, Icon, Block } from './AppTheme';
import { IconTypes } from './AppTheme/Icon';
import routes from '../navigation/routes';

// lets assume your you have this array
let data = [
  {
    index: 1,
    type: IconTypes.ionicon,
    icon: 'bed',
    name: 'Otel',
  },
  {
    index: 2,
    type: IconTypes.ionicon,
    icon: 'restaurant',
    name: 'Restoran',
  },
  {
    index: 3,
    type: IconTypes.material,
    icon: 'tour',
    name: 'Gezi & Tur',
  },
  {
    index: 4,
    type: IconTypes.fontAwesome5,
    icon: 'theater-masks',
    name: 'Etkinlik',
  },
  {
    index: 5,
    type: IconTypes.fontisto,
    icon: 'yacht',
    name: 'Tekne & Yat',
  },
  {
    index: 6,
    type: IconTypes.fontAwesome,
    icon: 'plane',
    name: 'Uçak Bileti',
  },
  {
    index: 7,
    type: IconTypes.fontAwesome,
    icon: 'bus',
    name: 'Otobüs Bileti',
  },
  {
    type: IconTypes.fontAwesome,
    icon: 'car',
    name: 'Araç Kirala',
  },
  {
    index: 8,
    type: IconTypes.material,
    icon: 'emoji-transportation',
    name: 'Vip Transfer',
  },
  {
    index: 9,
    type: IconTypes.foundation,
    icon: 'trees',
    name: 'Gezilecek Yerler',
  },
  {
    index: 10,
    type: IconTypes.fontAwesome,
    icon: 'pencil',
    name: 'Blog',
  },
];

export default function CategoryList({ onPress }) {
  return (
    <Block>
      <FlatList
        horizontal={true}
        data={data}
        renderItem={(item) => (
          <TouchableOpacity onPress={onPress}>
            <Block
              margin
              width={100}
              height={60}
              center
              middle
              color="#f4f4f4"
              radius={6}>
              <Icon
                type={item.item.type}
                name={item.item.icon}
                size={20}
                color="gray"
              />
              <Text color="gray">{item.item.name}</Text>
            </Block>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.index}
      />
    </Block>
  );
}
