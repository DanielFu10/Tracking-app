import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Map')}>
        <Text>Go to map Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
