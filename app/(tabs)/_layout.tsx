import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Foundation from '@expo/vector-icons/Foundation';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="home" size={24} color={focused ? 'blue' : 'black'} />
          ),
        }}
      />
      <Tabs.Screen
        name="start"
        options={{
          title: 'Start',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="not-started" size={24} color={focused ? 'blue' : 'black'} />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          tabBarIcon: ({ color, focused }) => (
            <Foundation name="results-demographics" size={24} color={focused ? 'blue' : 'black'} />
          ),
        }}
      />
      <Tabs.Screen
        name="custom"
        options={{
          title: 'Custom',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="dashboard-customize" size={24} color={focused ? 'blue' : 'black'} />
          ),
        }}
      />
    </Tabs>
  );
}
