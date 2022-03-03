import React, { useEffect, useState, useRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Block, Text } from '../../components/AppTheme';
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps';
import IconWithClick from '../../components/IconWithClick';
import { IconTypes } from '../../components/AppTheme/Icon';
import colors from '../../config/colors';
import routes from '../../navigation/routes';
import useApi from '../../hooks/useApi';
import activities from '../../api/activities';
import LoadingIndicator from '../../components/LoadingIndicator';
import LocationPermissionPopUp from '../../components/opportunities/LocationPermissionPopUp';
import LocationRangeSliderPopup from '../../components/restaurant/LocationRangeSliderPopup';
import { openSettings } from 'react-native-permissions';
import GetLocation from 'react-native-get-location';
import SearchNearBtn from '../../components/searchNear/SearchNearBtn';
import RestaurantMapItem from '../../components/restaurant/RestaurantMapItem';
import AppStyles from '../../config/AppStyles';
import { useTranslation } from 'react-i18next';

const EventListMap = ({ navigation }) => {
  const { t } = useTranslation();
  const mapRef = useRef();
  const [filterSelected, setFilterSelected] = useState(false);

  const [eventsList, setEventsList] = useState([]);
  const [eventsListData, setEventsListData] = useState(null);
  const [firstTimeOpen, setFirstTimeOpen] = useState(true);
  const [itIsUserAction, setUserAction] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const getEventsListApi = useApi(activities.getActivitiesByDistance);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState({});
  const [locationRangeVisible, setLocationRangeVisible] = useState(false);
  const [locationPermissionVisible, setLocationPermissionVisible] =
    useState(false);

  const getEventsList = async (q) => {
    const result = await getEventsListApi.request(q);

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
      setEventsList(result.data.data.list);
      setEventsListData(result.data.data);
    } else {
    }
  };
  useEffect(() => {
    getEventsList();
  }, []);

  return (
    <Block noFlex>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        ref={mapRef}
        onRegionChangeComplete={(props) => {
          if (!itIsUserAction) {
            getEventsList({
              ...query,
              latitude: props.latitude,
              longitude: props.longitude,
            });
          } else {
            setUserAction(false);
          }
        }}
        style={styles.map}>
        {eventsList.map((marker, index) => {
          return (
            <Marker
              onPress={() => {
                setUserAction(true);
                setSelectedEvent(marker);
              }}
              hideCallout
              key={index}
              coordinate={marker.location}>
              <Image
                source={require('../../assets/images/dropbin.png')}
                style={AppStyles.pin}
              />
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
                navigation.navigate(routes.EVENT_LIST_SEE_ALL);
              }}>
              {t('what_are_you_looking_for')}
            </Text>
          </Block>
          <Block row center>
            <IconWithClick
              name={'filter'}
              type={IconTypes.antdesign}
              size={20}
              showBadge={filterSelected}
              color={colors.semiBlack}
              marginRight
              marginLeft
              onPress={() => {
                navigation.navigate(routes.EVENT_FILTERS_SCREEN, {
                  filters: eventsListData.filters,
                  onReturn: (selectedFilters) => {
                    setFilterSelected(true);
                    setQuery({
                      ...query,

                      ...selectedFilters,
                    });
                    setEventsList([]);
                    getEventsList({
                      ...query,

                      ...selectedFilters,
                    });
                  },
                  onDeleteAll: () => {
                    setFilterSelected(false);
                    setQuery({
                      ...query,
                    });
                    setEventsList([]);
                    getEventsList({
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
              latitude: query.latitude,
              longitude: query.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            1500,
          );

          setQuery({ ...query, range: value });
          setEventsList([]);
          getEventsList({ ...query, range: value });
        }}
      />
      <LoadingIndicator visible={getEventsListApi.loading || loading} />
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
              setEventsList([]);
              getEventsList();
            }
          }}
        />
        {selectedEvent && (
          <RestaurantMapItem
            item={selectedEvent}
            onPress={() => {
              navigation.navigate(routes.EVENT_DETAIL, {
                id: selectedEvent.id,
              });
            }}
          />
        )}
      </Block>
    </Block>
  );
};

export default EventListMap;

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
