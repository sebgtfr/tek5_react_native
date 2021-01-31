import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    width: width / 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
});
