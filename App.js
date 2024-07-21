import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from "@react-navigation/native";

import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RemindersScreen from "./screens/RemindersScreen";
import ProjectInfoScreen from "./screens/project/ProjectInfoScreen";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Constants from "expo-constants";
import { Colors } from "./constants";

const statusBarHeight = Constants.statusBarHeight;

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: "#0A0A0A",
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function MainTabs() {
  return (
    <Tab.Navigator
      style={{ borderRadius: 30 }}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPrimary,
          borderWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: Colors.blackPrimary,
          borderTopWidth: 0,
          alignItems: "center",
        },
        headerTitleStyle: {
          color: "#E9EBEE",
          fontSize: 22,
        },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
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
        const projectId = response.notification.request.content.data.projectId;
        if (projectId && navigationRef.isReady()) {
          navigationRef.navigate("ProjectInfo", { projectId });
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <>
      <View style={styles.root}>
        <StatusBar style="light" backgroundColor={Colors.blackPrimary} />
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {isAuthenticated ? (
              <>
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen
                  name="ProjectInfo"
                  component={ProjectInfoScreen}
                />
              </>
            ) : (
              <Stack.Screen name="Login" component={LoginScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: statusBarHeight,
  },
});
