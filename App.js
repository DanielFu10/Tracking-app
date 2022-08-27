import React, {Component, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '@env';

const App = () => {
  const [coords, setCoords] = useState({
    origin: {
      latitude: 37.3318456,
      longitude: -122.0296002,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    destination: {
      latitude: 37.771707,
      longitude: -122.4053769,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const {origin, destination} = coords;

  return (
    <MapView style={StyleSheet.absoluteFill} initialRegion={origin}>
      <Marker coordinate={origin} />
      <Marker coordinate={destination} />
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
      />
    </MapView>
  );
};

export default App;
