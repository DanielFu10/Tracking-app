import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {LogBox} from 'react-native';

import AddressPickup from '../components/AddressPickup';
import CustomButton from '../components/CustomButton';
import {showError, showSuccess} from '../helper/Message';

const ChooseLocation = ({route, navigation}) => {
  const [destination, setDestination] = useState({
    destinationCoords: {},
  });

  const {destinationCoords} = destination;

  const checkValid = () => {
    if (Object.keys(destinationCoords).length === 0) {
      showError('Please enter destination location');
      return false;
    }
    return true;
  };

  const onDone = () => {
    const isValid = checkValid();
    if (isValid) {
      const {getCoordinates} = route.params;
      getCoordinates({
        destinationCoords,
      });
      showSuccess('Directions calculated');
      navigation.goBack();
    }
  };

  const fetchDestinationCoords = coords => {
    console.log(coords);
    setDestination(prevState => {
      return {
        ...prevState,
        destinationCoords: coords,
      };
    });
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.adressContainer}>
        <View style={styles.viewContainer} />
        <AddressPickup
          placeholderText={'Enter Destination Location'}
          fetchAddress={fetchDestinationCoords}
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
