import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployerProfile from './screens/profile';
import Home from './screens/Feed';
import PostFood from './screens/post_food';
import { Ionicons } from '@expo/vector-icons';
import Planner from './screens/planner';
import Account from './screens/account';
import Profile from './screens/profile';
import Planning from './screens/Planning';
//import NetworkContext from './Context/context';
//import {useRoute} from '@react-navigation/native';


export default function Router() {
   //getconst addressPass = useRoute();
  return (
     /*  <NetworkContext.Provider value={addressPass.params.network}>  */
 
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={'md-home-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'PostJob') {
              return (
                <Ionicons
                  name={'md-add'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Profile'){
              <Ionicons
                  name={'md-person'}
                  size={size}
                  color={color}
                />
            } else if (route.name === 'BuyingPlan'){
              <Ionicons
                name={'basket-outline'}
                size={size}
                color={color}/>
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="Home" component={Home} /> 
          <Tab.Screen name="Planning" component={Planning} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
       /*  </NetworkContext.Provider>  */
     
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  