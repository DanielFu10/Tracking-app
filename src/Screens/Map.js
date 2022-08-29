import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '@env';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showError} from '../helper/Message';

import {getCurrentLocation} from '../helper/CurrentLocation';
import {locationPermission} from '../helper/Permission';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const DEFAULT_LATITUDE = 37.3318456;
const DEFAULT_LONGITUDE = -122.0296002;
let initialLatitude, initialLongitude;

const setInitialCoords = async () => {
  const locationPermissionGranted = await locationPermission();
  if (locationPermissionGranted) {
    const {latitude, longitude} = await getCurrentLocation();
    initialLatitude = latitude;
    initialLongitude = longitude;
  }
};

setInitialCoords();

const Map = ({navigation}) => {
  const mapRef = useRef();
  console.log(initialLatitude, initialLongitude);
  const [directionsCoords, setDirectionsCoords] = useState({
    currentLocation: {
      latitude: initialLatitude || DEFAULT_LATITUDE,
      longitude: initialLongitude || DEFAULT_LONGITUDE,
    },
    destinationCoords: {},
  });

  const {currentLocation, destinationCoords} = directionsCoords;

  const setLiveLocation = async () => {
    const locPermissionGranted = await locationPermission();
    if (locPermissionGranted) {
      const {latitude, longitude} = await getCurrentLocation();
      setDirectionsCoords(prevState => {
        return {
          ...prevState,
          currentLocation: {
            latitude,
            longitude,
          },
        };
      });
    }
  };

  useEffect(() => {
    setLiveLocation();
  }, []);

  const fetchValues = data => {
    setDirectionsCoords(prevState => {
      return {
        ...prevState,
        destinationCoords: {
          latitude: data.destinationCoords.latitude,
          longitude: data.destinationCoords.longitude,
        },
      };
    });
  };

  const onPressLocation = () => {
    navigation.navigate('ChooseLocation', {getCoordinates: fetchValues});
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...currentLocation,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker coordinate={currentLocation} />
          {Object.keys(destinationCoords).length > 0 && (
            <Marker coordinate={destinationCoords} />
          )}
          {Object.keys(destinationCoords).length > 0 && (
            <MapViewDirections
              origin={{
                ...currentLocation,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              destination={{
                ...destinationCoords,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 30,
                    bottom: 300,
                    left: 30,
                    top: 100,
                  },
                  animated: true,
                });
              }}
              onError={errorMessage => {
                showError(errorMessage);
              }}
            />
          )}
        </MapView>
      </View>
      <View style={styles.bottomCard}>
        <Text>Where are you going?</Text>
        <TouchableOpacity style={styles.inputStyle} onPress={onPressLocation}>
          <Text>Choose your location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inputStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default Map;
