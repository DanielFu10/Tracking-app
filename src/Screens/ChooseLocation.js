import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';

import AddressPickup from '../components/AddressPickup';
import CustomButton from '../components/CustomButton';

const ChooseLocation = ({route, navigation}) => {
  const [directionsCoords, setDirectionsCoords] = useState({
    originCoords: {},
    destinationCoords: {},
  });

  const {originCoords, destinationCoords} = directionsCoords;

  const onDone = () => {
    const {getCoordinates} = route.params;
    getCoordinates({
      originCoords,
      destinationCoords,
    });
    navigation.goBack();
  };

  const fetchOriginCoords = coords => {
    setDirectionsCoords(prevState => {
      return {
        ...prevState,
        originCoords: coords,
      };
    });
  };

  const fetchDestinationCoords = coords => {
    setDirectionsCoords(prevState => {
      return {
        ...prevState,
        destinationCoords: coords,
      };
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.adressContainer}>
        <AddressPickup
          placeholderText={'Enter Destination Location'}
          fetchAddress={fetchDestinationCoords}
        />
        <View style={styles.viewContainer} />
        <AddressPickup
          placeholderText={'Enter Origin Location'}
          fetchAddress={fetchOriginCoords}
        />
        <CustomButton
          btnText={'Done'}
          // eslint-disable-next-line react-native/no-inline-styles
          btnStyle={{marginTop: 24}}
          onPress={onDone}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  adressContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  viewContainer: {
    marginBottom: 14,
  },
});

export default ChooseLocation;
