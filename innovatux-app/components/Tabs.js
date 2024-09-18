import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons'; 

import Home from '../pages/Home';
import Feed from '../pages/Feed';
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import GroupSelection from '../pages/CommunityGroup';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Feed') {
            iconName = 'list';
          } else if (route.name === 'Community') {
            iconName = 'search';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#245C3B', // Active tab color
        tabBarInactiveTintColor: '#A9DFBF', // Inactive tab color
        tabBarStyle: {
          backgroundColor: '#EAF9F1', // Background color of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 14, // Font size of tab labels
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Community" component={GroupSelection} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default Tabs;
