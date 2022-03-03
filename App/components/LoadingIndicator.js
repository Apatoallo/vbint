import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
const LoadingIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        style={{ width: 50, height: 50 }}
        autoPlay={true}
        loop
        source={require('../assets/animations/heart.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    opacity: 0.8,
  },
});
export default LoadingIndicator;
