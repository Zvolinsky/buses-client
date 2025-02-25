import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, Text } from "react-native";
//screens
import BusStopsList from "./BusStopsStackNav/BusStopsList";
import ScheduleScreen from "./BusStopsStackNav/ScheduleScreen";

const Stack = createNativeStackNavigator();

const BusStopsScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="BusStopsList"
        options={{ title: "Wybierz przystanek" }}
        component={BusStopsList}
      />
      <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
    </Stack.Navigator>
  );
};

export default BusStopsScreen;
