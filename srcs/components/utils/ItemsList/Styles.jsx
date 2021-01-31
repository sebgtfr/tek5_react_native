import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
  cardContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContentText: {
    fontSize: 16,
  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionsButtonModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
