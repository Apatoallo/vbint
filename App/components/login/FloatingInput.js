import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated, Dimensions } from 'react-native';
import colors from '../../config/colors';
import { Block, Icon } from '../AppTheme';
import { IconTypes } from '../AppTheme/Icon';
import IconWithClick from '../IconWithClick';
import { RFValue } from 'react-native-responsive-fontsize';
import TextInputMask from 'react-native-text-input-mask';

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
    secure: true,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(
      this.props.value === '' ? 0 : 1,
    );
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: this.state.isFocused || this.props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      fontFamily:
        props?.value !== '' || this.state.isFocused
          ? 'Montserrat-Bold'
          : 'Montserrat-Regular',
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),

      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [
          RFValue(16, Dimensions.get('window').height),
          RFValue(16, Dimensions.get('window').height),
        ],
      }),

      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.semiBlack, colors.semiBlack],
      }),
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <Block
          row
          center
          style={{
            color: colors.semiBlack,
            borderBottomWidth: 1,
            borderBottomColor: colors.black,
          }}>
          <Block>
            {props?.isPhone ? (
              <TextInputMask
                {...props}
                mask={'+[000][000][000][000][000]'}
                secureTextEntry={props?.isPassword ? this.state.secure : false}
                style={{
                  height: 45,
                  fontSize: RFValue(16, Dimensions.get('window').height),
                  color: colors.semiBlack,
                  fontFamily: 'Montserrat-Regular',
                }}
                onFocus={this.handleFocus}
                blurOnSubmit
              />
            ) : (
              <TextInput
                {...props}
                secureTextEntry={props?.isPassword ? this.state.secure : false}
                style={{
                  height: 45,
                  fontSize: RFValue(16, Dimensions.get('window').height),
                  color: colors.semiBlack,
                  fontFamily: 'Montserrat-Regular',
                }}
                onFocus={this.handleFocus}
                blurOnSubmit
              />
            )}
          </Block>
          {props?.isPassword && (
            <IconWithClick
              type={IconTypes.entypo}
              name={this.state.secure ? 'eye-with-line' : 'eye'}
              color={colors.semiBlack}
              size={20}
              onPress={() => {
                this.setState({ secure: !this.state.secure });
              }}
            />
          )}
        </Block>
      </View>
    );
  }
}

export default FloatingLabelInput;
