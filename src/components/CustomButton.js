import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{...styles.btnStyle, ...props.btnStyle}}>
      <Text>{props.btnText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    borderWidth: 1,
  },
});

export default CustomButton;
