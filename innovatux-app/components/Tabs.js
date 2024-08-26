import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../pages/Home';
import Feed from '../pages/Feed';
import Search from '../pages/Search';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}


export default Tabs;