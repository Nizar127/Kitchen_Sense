import React, { useState, useEffect } from 'react';
import {useRoute} from '@react-navigation/native';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import Feed from '../screens/Feed';
import * as Location from 'expo-location';

const AddUserLocation = ({ navigation }) => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );
  //const item = useRoute();



  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);


  const GetCurrentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
  
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
  
      for (let myaddress of response) {
        

        let address = `${myaddress.name}, ${myaddress.street}, ${myaddress.postalCode}, ${myaddress.city}`;
  
        setDisplayCurrentAddress(address);
        if (address.length > 0) {
            setTimeout(() => {
              navigation.navigate('Household', { myaddress: address });
             
            }, 2000);
          }

      }
      
    }
  };


  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require('../assets/geolocation.png')} style={styles.image} />
        <Text style={styles.title}>What's your address?</Text>
      </View>
      <Text style={styles.text}>{displayCurrentAddress}</Text>
      {/* <Feed {...props} route={item}/> */}
    </View>
  );
};



// styles remain same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070707',
    alignItems: 'center',
    paddingTop: 130
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FD0139'
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff'
  }
});


export default AddUserLocation;

