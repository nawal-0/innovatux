import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons'; 

import Home from '../pages/Home';
import Feed from '../pages/Feed';
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import GroupSelection from '../pages/CommunityGroup';
import GroupChat from '../pages/Chat';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * CommunityPageStack Component
 * 
 * This component defines a stack navigator for the Community section of the app.
 * It includes screens for selecting a community group and the corresponding group chat.
 * 
 * @returns {React.Element} A Stack Navigator containing CommunityGroup and Chat screens.
 */
function CommunityPageStack() {
  return (
      <Stack.Navigator screenOptions={{
          headerShown: false
      }}>
          <Stack.Screen name = "CommunityGroup" component={GroupSelection}/>
          <Stack.Screen name="Chat" component={GroupChat}/>
      </Stack.Navigator>
  );
}

/**
 * Tabs Component
 * 
 * This component defines the bottom tab navigator for the application.
 * It includes tabs for Home, Feed, Community, Search, and Settings.
 * 
 * @returns {React.Element} A Bottom Tab Navigator containing multiple tabs.
 */
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
            iconName = 'play';
          } else if (route.name === 'Community') {
            iconName = 'people';
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
      <Tab.Screen name="Community" component={CommunityPageStack} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default Tabs;
