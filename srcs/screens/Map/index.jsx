import React from 'react';
import { View, Text } from 'react-native';

import MapView from 'react-native-maps';
//import Permission from 'expo';
import * as Location from 'expo-location';
//import { IntlConsumer } from '../../providers/IntlProvider';
//import { FirebaseConsumer } from '../../providers/FirebaseProvider';

import Styles from './Styles';


const Map = () => {
  //const [region, setRegion] = React.useState({latitude : 48.652717, longitude:5.183827, latitudeDelta: 0.922, longitudeDelta: 0.0421});
  const [region, setRegion] = React.useState(null);
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let tmpRegion = {
        latitude : location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045
      }
      setRegion(tmpRegion);
    })();
  }, []);
  
  return (

  <View style={Styles.container}>
    <MapView
      initialRegion={region}
      showsUserLocation={true}
      showsCompass={true}
      rotateEnabled={false}
      style={{flex: 1}}

    />
  </View>
  );
  };

Map.propTypes = {};

export default Map;
