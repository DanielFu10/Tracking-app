import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '@env';

const AddressPickup = props => {
  const onPressAddress = (data, details) => {
    console.log(data, details);
    const coords = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    props.fetchAddress(coords);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={props.placeholderText}
        onPress={onPressAddress}
        fetchDetails={true}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInputStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: 'white',
  },
  textInputStyle: {
    height: 48,
    color: 'black',
    fontSize: 16,
    backgroundColor: '#f3f3f3',
  },
});

export default AddressPickup;
