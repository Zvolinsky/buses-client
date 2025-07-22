import MainScreen from "./src/MainScreen";
import BusesScreen from "./src/screens/BusesScreen";
import BusStopsScreen from "./src/screens/BusStopsScreen";
import SearchConnectionScreen from "./src/screens/SearchConnectionScreen";
import Layout from "./src/Layout";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./src/screens/SettingsScreen";
import MapScreen from "./src/screens/MapScreen";
import React from "react";

export type RootScreenNameList = {
  Main: undefined;
  Buses: undefined;
  BusStops: undefined;
  SearchConnection: undefined;
  Map: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootScreenNameList>();

export default () => (
  <Layout>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Buses" component={BusesScreen} />
        <Stack.Screen name="BusStops" component={BusStopsScreen} />
        <Stack.Screen
          name="SearchConnection"
          component={SearchConnectionScreen}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Layout>
);
