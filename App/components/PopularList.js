import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Block, Icon } from './AppTheme';
import { IconTypes } from './AppTheme/Icon';

class PopularList extends Component {
  render() {
    return (
      <Block noflex style={{ marginHorizontal: 10, height: 230 }}>
        <ImageBackground
          source={this.props.imageUri}
          resizeMode="stretch"
          style={{
            width: 140,
            height: 150,
            justifyContent: 'flex-end',
            padding: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 16 }}>
            {this.props.innerText}
          </Text>
        </ImageBackground>
        <Block row>
          <Icon
            type={IconTypes.fontAwesome}
            name="exclamation-circle"
            color="gray"
            size={14}
            style={{ padding: 2 }}
          />
          <Text style={{ color: 'gray', fontSize: 14 }}>{this.props.text}</Text>
        </Block>
        <Text style={{ color: 'gray', fontSize: 12 }}>
          {this.props.textDescription}
        </Text>
      </Block>
    );
  }
}
export default PopularList;

const styles = StyleSheet.create({});
