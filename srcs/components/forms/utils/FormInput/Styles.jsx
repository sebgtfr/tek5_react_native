import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
});
