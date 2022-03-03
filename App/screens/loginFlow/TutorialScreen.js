import React from 'react';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Block, Text } from '../../components/AppTheme';
import { Dimensions, StyleSheet } from 'react-native';
import routes from '../../navigation/routes';
import { StackActions } from '@react-navigation/routers';
import { useTranslation } from 'react-i18next';

const data = [
  {
    title: 'Aenean leo',
    body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
    imgUrl: 'https://picsum.photos/id/11/200/300',
  },
  {
    title: 'In turpis',
    body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
    imgUrl: 'https://picsum.photos/id/10/200/300',
  },
  {
    title: 'Lorem Ipsum',
    body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
    imgUrl: 'https://picsum.photos/id/12/200/300',
  },
];
const TutorialScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  return (
    <Block white>
      <Block height={Dimensions.get('screen').height * 0.45} flex={0}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={false}
        />
      </Block>
      <Block marginTop flex={0} marginLeft={32} marginRight={32}>
        <Text size={70} notera>
          Bodrum
        </Text>
        <Text medium size={30}>
          Lorem ıpsum dolor Sı amet
        </Text>
        <Text>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem Nemo
          enim ipsam voluptatem quia voluptas sit aspernatur .
        </Text>
      </Block>
      <Block>
        <Block style={styles.bottomContainer} center row>
          <Block center>
            <Text
              bold
              onPress={() => {
                navigation.dispatch(StackActions.replace(routes.LOGIN_STACK));
              }}>
              {t('skip')}
            </Text>
          </Block>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
          <Block center>
            {index == 2 && (
              <Text
                bold
                onPress={() => {
                  navigation.dispatch(StackActions.replace(routes.LOGIN_STACK));
                }}>
                {t('ok')}
              </Text>
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
