import React from 'react';
import { StyleSheet } from 'react-native';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import { Block, Text } from '../../components/AppTheme';

const CarDetailsScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: AppStyles.title,
      headerTitleAlign: 'center',
      headerBackTitle: ' ',
      headerBackImage: () => <BackIcon />,
      headerTitle: (props) => (
        <Text bold numberOfLines={1}>
          İzmir - Bodrum
        </Text>
      ),
    });
  }, [navigation]);
  return (
    <Block>
      <Text></Text>
    </Block>
  );
};

export default CarDetailsScreen;

const styles = StyleSheet.create({});
