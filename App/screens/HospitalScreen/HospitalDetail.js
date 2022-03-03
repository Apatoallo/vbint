import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import colors from '../../config/colors';
import IconContainer from '../../components/IconContainer';
import AppButton from '../../components/AppButton';
import Separator from '../../components/Separator';
import routes from '../../navigation/routes';
import IconLabelButton from '../../components/IconLabelButton';
import { IconTypes } from '../../components/AppTheme/Icon';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ShareTool from '../../utils/ShareTool';
import hospitals from '../../api/hospitals';
import useApi from '../../hooks/useApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import AppImage from '../../components/AppImage';
import AppStyles from '../../config/AppStyles';
import MapHelper from '../../utils/MapHelper';
import { useTranslation } from 'react-i18next';

const HospitalDetail = ({ navigation, route }) => {
  const { t } = useTranslation();
  const getHospitalDetailsApi = useApi(hospitals.getHospitalDetails);
  const [hospitalDetails, setHospitalDetails] = useState(null);

  const getHospitalDetails = async () => {
    const result = await getHospitalDetailsApi.request(route?.params?.id);

    if (result.ok) {
      setHospitalDetails(result.data.data);
    } else {
    }
  };
  useEffect(() => {
    getHospitalDetails();
  }, []);

  return (
    <Block white scroll showsVerticalScrollIndicator={false}>
      {
        hospitalDetails ? <>
          <Block shadow flex={0}>
            <AppImage
              style={styles.headerImage}
              url={hospitalDetails?.showcaseImage}
            />
            <IconContainer
              icon={{
                type: 'fontAwesome',
                name: 'angle-left',
                size: 27,
                color: colors.blackGrey,
              }}
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backIcon}
              backgroundColor={colors.white}
            />
          </Block>
          <Block>
            <Block padding={[8, 16, 16, 16]}>
              <Block marginBottom={16}>
                <Text size={20} medium marginBottom>
                  {hospitalDetails?.title}
                </Text>
                <Block row center marginBottom={20}>
                  <Block>
                    <Text numberOfLines={2} medium>
                      {hospitalDetails?.address}
                    </Text>
                  </Block>
                  <Block>
                    <AppButton
                      onPress={() => {
                        navigation.navigate(routes.FULL_SCREEN_MAP, {
                          latitude: hospitalDetails.latitude,
                          longitude: hospitalDetails.longitude,
                        });
                      }}
                      title={t('show_map')}
                      textOnly
                      underlined
                      size={12}
                      marginLeft
                      textColor={colors.underlinedText}
                    />
                  </Block>
                </Block>
                <Separator backgroundColor={colors.lightGray} marginBottom={16} />
                <Text
                  numberOfLines={4}
                  marginBottom
                  medium
                  color={colors.hotelCardGrey}>
                  {hospitalDetails?.description}
                </Text>
                <AppButton
                  title={t('show_more')}
                  onPress={() => {
                    navigation.navigate(routes.ABOUT, {
                      title: hospitalDetails.title,
                      subTitle: hospitalDetails.description,
                      hideHeader: true,
                    });
                  }}
                  size={12}
                  textOnly
                  underlined
                  textColor={colors.underlinedText}
                  marginBottom={20}
                />
                <IconLabelButton
                  title={t('contact2')}
                  icon={{
                    type: IconTypes.fontAwesome,
                    name: 'phone',
                    size: 22,
                  }}
                  middle
                  onPress={() => {
                    ShareTool.callNumber(hospitalDetails.phone);
                  }}
                  marginBottom={16}
                />
                <Separator backgroundColor={colors.lightGray} marginBottom />
              </Block>
              <Block>
                <Text bold size={20} marginBottom={5}>
                  {t('location')}
                </Text>
                <Text marginBottom>{hospitalDetails?.address}</Text>
                {hospitalDetails.latitude && (
                  <TouchableOpacity
                    onPress={() => {
                      MapHelper.openMap({
                        latitude: hospitalDetails.latitude,
                        longitude: hospitalDetails.longitude,
                        address: hospitalDetails.address,
                      });
                    }}>
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      pitchEnabled={false}
                      zoomEnabled={false}
                      zoomTapEnabled={false}
                      scrollEnabled={false}
                      initialRegion={{
                        latitude: hospitalDetails?.latitude,
                        longitude: hospitalDetails?.longitude,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121,
                      }}
                      onPress={() => {
                        MapHelper.openMap({
                          latitude: hospitalDetails.latitude,
                          longitude: hospitalDetails.longitude,
                          address: hospitalDetails.address,
                        });
                      }}
                      style={styles.map}>
                      <Marker
                        coordinate={{
                          latitude: hospitalDetails?.latitude,
                          longitude: hospitalDetails?.longitude,
                        }}>
                        <Image
                          source={require('../../assets/images/dropbin.png')}
                          style={AppStyles.pin}
                        />
                      </Marker>
                    </MapView>
                  </TouchableOpacity>
                )}
              </Block>
            </Block>
          </Block>
        </> : null
      }
      <LoadingIndicator visible={getHospitalDetailsApi.loading} />
    </Block>
  );
};

export default HospitalDetail;

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.35,
    resizeMode: 'cover',
  },
  backIcon: {
    marginLeft: 10,
    marginTop: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  map: {
    height: 200,
    width: '100%',
    borderRadius: 16,
  },
});
