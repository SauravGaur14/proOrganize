import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import RemindersScreen from "./screens/RemindersScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProjectInfoScreen from "./screens/project/ProjectInfoScreen";
import LoginScreen from "./screens/LoginScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform, Alert } from "react-native";
import { createNavigationContainerRef } from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigation = useNavigation();
  const navigationRef = createNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access notifications was denied");
      }
    };

    getPermissions();

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const projectId = response.notification.request.content.data.projectId; // Get projectId from notification data
        if (projectId && navigationRef.isReady()) {
          navigationRef.navigate("ProjectInfo", { projectId });
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="ProjectInfo" component={ProjectInfoScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
