import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from './screens/DashboardScreen';
import SensorsScreen from './screens/SensorsScreen';
import DevicesScreen from './screens/DevicesScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },

        headerTintColor: '#222',

        headerTitleStyle: {
          fontWeight: '600',
        },

        headerShadowVisible: false,

        drawerActiveTintColor: '#4E7D56',
        drawerInactiveTintColor: '#666',

        drawerActiveBackgroundColor: '#EAF4EC',

        drawerLabelStyle: {
          marginLeft: -5,
          fontSize: 14,
          fontWeight: '500',
        },

        drawerItemStyle: {
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 3,
        },

        sceneStyle: {
          backgroundColor: '#F8F8F8',
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="grid-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Sensors"
        component={SensorsScreen}
        options={{
          title: 'Sensors',
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="analytics-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Devices"
        component={DevicesScreen}
        options={{
          title: 'Devices',
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="hardware-chip-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}