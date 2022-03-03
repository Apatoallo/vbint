import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import AppStyles from '../../config/AppStyles';
import BackIcon from '../../components/BackIcon';
import VerticalSeparator from '../../components/VerticalSeparator';
import colors from '../../config/colors';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import ListsItems from '../../config/ListsItems';
import CalenderDayItem from '../../components/myCalender/CalenderDayItem';
import routes from '../../navigation/routes';
import CarListItem from '../../components/carRent/CarListItem';

const CarsListScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(null);
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
      headerRight: () => (
        <Block center row marginRight>
          <VerticalSeparator backgroundColor={colors.lightGray} />
          <IconWithClick
            name={'filter'}
            type={IconTypes.antdesign}
            size={20}
            color={colors.semiBlack}
            marginRight
            marginLeft
            onPress={() => {}}
          />
        </Block>
      ),
    });
  }, [navigation]);
  return (
    <Block white>
      <Block center flex={0} row margin={16}>
        <Text
          style={styles.totalText}
          marginLeft
          size={13}
          numberOfLines={1}
          marginRight>
          ‘’Aramanıza uygun 5 uçuş listeleniyor’’
        </Text>
      </Block>
      <Block flex={0}>
        <FlatList
          data={ListsItems.mainPage}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          renderItem={(item) => (
            <CalenderDayItem
              dayName={'p'}
              dayNumber={'15'}
              selected={selectedDate === item.index ? true : false}
              onPress={() => {
                setSelectedDate(item.index);
              }}
            />
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
      <Block>
        <FlatList
          data={ListsItems.mainPage}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => (
            <CarListItem
              showLogo={false}
              onPress={() => {
                navigation.push(routes.CAR_DETAILS_SCREEN);
              }}
            />
          )}
          keyExtractor={(item) => item.index}
        />
      </Block>
    </Block>
  );
};

export default CarsListScreen;

const styles = StyleSheet.create({
  totalText: { alignSelf: 'flex-end' },
});
