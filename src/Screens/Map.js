import React, {Component, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '@env';

const Map = () => {
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

  const mapRef = useRef();
  const {origin, destination} = coords;

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      initialRegion={origin}>
      <Marker coordinate={origin} />
      <Marker coordinate={destination} />
      <MapViewDirections
        origin={origin}
        destination={destination}
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
          });
        }}
      />
    </MapView>
  );
};

export default Map;
