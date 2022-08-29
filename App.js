import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Screens/Home';
import Map from './src/Screens/Map';
import ChooseLocation from './src/Screens/ChooseLocation';

import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen
          name="ChooseLocation"
          component={ChooseLocation}
          options={{title: 'Choose a location'}}
        />
        <Stack.Screen name="Map" component={Map} options={{title: 'Map'}} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
