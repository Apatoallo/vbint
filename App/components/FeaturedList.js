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

class FeaturedList extends Component {
  render() {
    return (
      <Block style={{ marginHorizontal: 10, width: 220, height: 220 }}>
        <ImageBackground
          source={this.props.imageUri}
          resizeMode="stretch"
          style={{
            width: 220,
            height: 220,
            justifyContent: 'flex-end',
            padding: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 16 }}>
            {this.props.text}
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
            }}>
            <Icon
              type={IconTypes.fontAwesome}
              name="arrow-circle-right"
              style={{ fontSize: 20, color: '#a5a4a4' }}
            />
          </TouchableOpacity>
        </ImageBackground>
      </Block>
    );
  }
}
export default FeaturedList;

const styles = StyleSheet.create({});
