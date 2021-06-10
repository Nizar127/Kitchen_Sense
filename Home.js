import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployerProfile from './screens/profile';
import Feed from './screens/Feed';
import PostFood from './screens/post_food';
import { Ionicons } from '@expo/vector-icons';
import BuyingPlan from './screens/buying_plan';
import Account from './screens/account';
import Profile from './screens/profile';

export default function Home() {
    return (
     
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            if (route.name === 'Feed') {
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
          <Tab.Screen name="Feed" component={Feed} /> 
          <Tab.Screen name="PostFood" component={PostFood} />
          <Tab.Screen name="BuyingPlan" component={BuyingPlan} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
     
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
  