import React, { useState } from "react";
import { View, Text, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./earth_screen/Home";
const Tab = createBottomTabNavigator();

function MessengerScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MEss!</Text>
    </View>
  );
}

function FriendScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Acc!</Text>
    </View>
  );
}

function NotifyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notify!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: {} }}>
        <Tab.Screen name={"Earth"} component={HomeScreen} options={{
          headerStyle: {}, headerTitleAlign: "left", headerRight:() => (<Ionicons name="search-circle-outline" size={45} style = {{marginRight:'3%',position:'absolute',}}/>),
          headerTintColor: '#dc3545', headerTitleStyle: { paddingLeft: 5, fontSize: 25, fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <Ionicons name="compass-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
        <Tab.Screen name={"Mess"} component={MessengerScreen} options={{
          tabBarBadge: 3, tabBarIcon: ({ focused }) => (
            <Ionicons name="chatbox-ellipses-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
        <Tab.Screen name={"friend"} component={FriendScreen} options={{
          tabBarBadge: 3, tabBarIcon: ({ focused }) => (
            <Ionicons name="people-circle-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
        <Tab.Screen name={"Notify"} component={NotifyScreen} options={{
          tabBarBadge: 3, tabBarIcon: ({ focused }) => (
            <Ionicons name="notifications-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
        <Tab.Screen name={"Setting"} component={SettingsScreen} options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="settings-outline" size={40} color={focused ? '#dc3545' : 'black'} />
          )
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}