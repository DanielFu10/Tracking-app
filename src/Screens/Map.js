import React, {useState, useRef} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '@env';
import {TouchableOpacity} from 'react-native-gesture-handler';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = ({navigation}) => {
  const [directionsCoords, setDirectionsCoords] = useState({
    originCoords: {
      latitude: 37.3318456,
      longitude: -122.0296002,
    },
    destinationCoords: {
      latitude: 37.771707,
      longitude: -122.4053769,
    },
  });

  const mapRef = useRef();
  const {originCoords, destinationCoords} = directionsCoords;

  const fetchValues = data => {
    setDirectionsCoords({
      originCoords: {
        latitude: data.originCoords.latitude,
        longitude: data.originCoords.longitude,
      },
      destinationCoords: {
        latitude: data.destinationCoords.latitude,
        longitude: data.destinationCoords.longitude,
      },
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
            ...originCoords,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker coordinate={originCoords} />
          <Marker coordinate={destinationCoords} />
          <MapViewDirections
            origin={{
              ...originCoords,
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
              console.log('Error');
            }}
          />
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
