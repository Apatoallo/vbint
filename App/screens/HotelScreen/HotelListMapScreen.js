import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import HotelMapItem from '../../components/hotelSearch/HotelMapItem';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import colors from '../../config/colors';
import VerticalSeparator from '../../components/VerticalSeparator';
import routes from '../../navigation/routes';
import useApi from '../../hooks/useApi';
import hotels from '../../api/hotels';
import LoadingIndicator from '../../components/LoadingIndicator';
import LocationPermissionPopUp from '../../components/opportunities/LocationPermissionPopUp';
import LocationRangeSliderPopup from '../../components/restaurant/LocationRangeSliderPopup';
import { openSettings } from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import SearchNearBtn from '../../components/searchNear/SearchNearBtn';
import StartEndDateSelector from '../../components/StartEndDateSelector';
import { useTranslation } from 'react-i18next';

const HotelListMapScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const mapRef = useRef();

  const [filterSelected, setFilterSelected] = useState(false);

  const [hotelsList, setHotelsList] = useState([]);
  const [hotelsListData, setHotelsListData] = useState(null);
  const [firstTimeOpen, setFirstTimeOpen] = useState(true);
  const [itIsUserAction, setUserAction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const getHotelListApi = useApi(hotels.getHotelsByDistance);
  const [query, setQuery] = useState({});

  const [locationRangeVisible, setLocationRangeVisible] = useState(false);
  const [locationPermissionVisible, setLocationPermissionVisible] =
    useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const getHotelsList = async (q) => {
    const result = await getHotelListApi.request(q);

    if (result.ok) {
      if (firstTimeOpen) {
        setFirstTimeOpen(false);
        mapRef.current.animateToRegion(
          {
            latitude: result.data.data.defaultLocation.defaultLatitude,
            longitude: result.data.data.defaultLocation.defaultLongitude,
            latitudeDelta: result.data.data.defaultLocation.latitudeDelta,
            longitudeDelta: result.data.data.defaultLocation.longitudeDelta,
          },
          1500,
        );
      }
      setHotelsList(result.data.data.list);
      setHotelsListData(result.data.data);
    } else {
    }
  };
  useEffect(() => {
    getHotelsList();
  }, []);

  return (
    <Block noFlex>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        ref={mapRef}
        onRegionChangeComplete={(props) => {
          if (!itIsUserAction) {
            getHotelsList({
              ...query,
              latitude: props.latitude,
              longitude: props.longitude,
            });
          } else {
            setUserAction(false);
          }
        }}
        style={styles.map}>
        {hotelsList.map((marker, index) => {
          return (
            <Marker
              onPress={() => {
                setUserAction(true);
                setSelectedHotel(marker);
              }}
              hideCallout
              key={index}
              coordinate={marker.location}>
              <Block
                padding
                noFlex
                radius={12}
                shadow
                color={
                  selectedHotel?.id === marker.id ? colors.btnBg : colors.white
                }>
                <Text
                  size={14}
                  bold
                  color={
                    selectedHotel?.id === marker.id
                      ? colors.white
                      : colors.black
                  }>
                  {marker.price} TL
                </Text>
              </Block>
            </Marker>
          );
        })}
        {query.range && (
          <Circle
            center={{
              latitude: query.latitude,
              longitude: query.longitude,
            }}
            radius={query.range * 1000}
            fillColor={'rgba(47, 180,222, 0.3)'}
            strokeColor={'#2FB4DE'}
          />
        )}
      </MapView>

      <Block style={styles.topBar}>
        <Block
          center
          padding={[12, 8, 12, 8]}
          shadow
          white
          margin={16}
          row
          radius={16}
          space={'between'}>
          <Block row center>
            <IconWithClick
              type={IconTypes.fontAwesome}
              name={'angle-left'}
              color="gray"
              size={25}
              marginRight
              marginLeft
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text
              bold
              color={colors.semiBlack}
              marginLeft
              onPress={() => {
                navigation.navigate(routes.HOTEL_LISTING_SCREEN);
              }}>
              {t('what_are_you_looking_for')}
            </Text>
          </Block>
          <Block row center>
            <Text
              onPress={() => {
                setCalendarVisible(true);
              }}
              color={colors.secondary}
              bold
              size={14}
              marginRight>
              {startDate ? t('date_added') : t('add_date')}
            </Text>
            <VerticalSeparator backgroundColor={colors.grey} />
            <IconWithClick
              name={'filter'}
              type={IconTypes.antdesign}
              size={20}
              showBadge={filterSelected}
              color={colors.semiBlack}
              marginRight
              marginLeft
              onPress={() => {
                navigation.navigate(routes.HOTEL_FILTERS_SCREEN, {
                  filters: hotelsListData.filters,
                  onReturn: (selectedFilters) => {
                    setFilterSelected(true);
                    setQuery({
                      ...query,

                      ...selectedFilters,
                    });
                    setHotelsList([]);
                    getHotelsList({
                      ...query,

                      ...selectedFilters,
                    });
                  },
                  onDeleteAll: () => {
                    setFilterSelected(false);
                    setQuery({
                      ...query,
                    });
                    setHotelsList([]);
                    getHotelsList({
                      ...query,
                    });
                  },
                });
              }}
            />
          </Block>
        </Block>
      </Block>
      <LocationPermissionPopUp
        isVisible={locationPermissionVisible}
        hideModal={() => {
          setLocationPermissionVisible(false);
        }}
        onYes={() => {
          openSettings().catch(() => console.warn('cannot open settings'));
        }}
      />
      <LocationRangeSliderPopup
        isVisible={locationRangeVisible}
        hideModal={() => {
          setQuery({ ...query, range: null });
          setLocationRangeVisible(false);
        }}
        onYes={(value) => {
          setLocationRangeVisible(false);
          mapRef.current.animateToRegion(
            {
              latitude: query.lat,
              longitude: query.lon,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            1500,
          );

          setQuery({ ...query, range: value });
          setHotelsList([]);
          getHotelsList({ ...query, range: value });
        }}
      />
      <LoadingIndicator visible={getHotelListApi.loading || loading} />
      <Block style={styles.hotelDetails}>
        <SearchNearBtn
          active={query.range}
          onPress={() => {
            if (!query.range) {
              setLoading(true);
              GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
              })
                .then((location) => {
                  setLoading(false);

                  setQuery({
                    ...query,
                    latitude: location.latitude,
                    longitude: location.longitude,
                  });
                  setLocationRangeVisible(true);
                })
                .catch((error) => {
                  setLoading(false);

                  const { code, message } = error;
                  setLocationPermissionVisible(true);
                });
            } else {
              setFirstTimeOpen(false);
              setQuery({});
              setHotelsList([]);
              getHotelsList();
            }
          }}
        />
        {selectedHotel && (
          <HotelMapItem
            item={selectedHotel}
            onPress={() => {
              navigation.navigate(routes.HOTEL_DETAILS_SCREEN, {
                id: selectedHotel.id,
              });
            }}
          />
        )}
      </Block>
      <StartEndDateSelector
        isVisible={calendarVisible}
        onClose={() => {
          setCalendarVisible(false);
        }}
        allowRangeSelection
        showRemove={true}
        onSelect={({ startDate, endDate }) => {
          setCalendarVisible(false);
          setStartDate(startDate.format('DD-MM-YYYY'));
          setEndDate(endDate.format('DD-MM-YYYY'));
          setQuery({
            ...query,
            page: 1,
            departureDate: startDate.format('DD-MM-YYYY'),
            returnDate: endDate.format('DD-MM-YYYY'),
          });
          setHotelsList([]);
          getHotelsList({
            ...query,
            page: 1,
            departureDate: startDate.format('DD-MM-YYYY'),
            returnDate: endDate.format('DD-MM-YYYY'),
          });
        }}
        onRemove={() => {
          setCalendarVisible(false);
          setStartDate(null);
          setEndDate(null);
          setQuery({
            page: 1,
          });
          setHotelsList([]);
          getHotelsList({
            page: 1,
          });
        }}
      />
    </Block>
  );
};

export default HotelListMapScreen;

const styles = StyleSheet.create({
  map: { height: '100%' },
  hotelDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  input: {
    borderWidth: 0,
    width: 200,
  },
});
