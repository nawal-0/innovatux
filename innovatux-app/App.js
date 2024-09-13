/*
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import Login from './pages/Login';
import Tabs from './components/Tabs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex:1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator> 
      </NavigationContainer>
    </SafeAreaView>
  );
}
*/

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';

import { UserProvider } from './components/UserContext';
import Login from './pages/Login';
import Tabs from './components/Tabs'; // Make sure this path is correct
import SignUp from './pages/SignUp';


const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
      </UserProvider>
    </SafeAreaView>
  );
}
