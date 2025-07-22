import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { ThemeContext } from "../Layout";

import api from "../services/api";
import { BusRouteDirection, BusRouteStop } from "../types/databaseTypes";

const Tab = createMaterialTopTabNavigator();

type TabNavigatorProps = {
  data: BusRouteDirection[];
  bus: { busId: number; busName: string };
};

type TableProps = {
  navigation: any;
  route: {
    params: {
      busRouteDirectionId: number;
      busId: number;
      busName: string;
      direction: string;
    };
  };
};

export const Table: React.FC<TableProps> = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const { busRouteDirectionId, busId, busName, direction } = route.params;
  const [busRouteStops, setBusRouteStops] = useState<BusRouteStop[] | null>(
    null
  );

  useEffect(() => {
    fetch(`${api.getBusRouteStops}${busRouteDirectionId}`)
      .then((response) => response.json())
      .then((json) => {
        setBusRouteStops(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <FlatList
      data={busRouteStops}
      renderItem={({ item }) => (
        <View style={{ backgroundColor: theme.colors.background }}>
          <Button
            key={item.id}
            labelStyle={{
              fontSize: 20,
              paddingHorizontal: 20,
              width: "100%",
              height: 40,
              textAlign: "left",
              verticalAlign: "middle",
            }}
            onPress={() =>
              navigation.navigate("ScheduleScreen", {
                busId: busId,
                busStopId: item.busStopId,
                busName: busName,
                busRouteDirectionId: busRouteDirectionId,
                direction: direction,
              })
            }
          >
            <Text>{item.busStop.name}</Text>
          </Button>
          <Divider leftInset bold theme={theme} />
        </View>
      )}
    />
  );
};

const TabNavigator: React.FC<TabNavigatorProps> = ({ data, bus }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primaryContainer,
          borderTopWidth: 3,
        },
        tabBarLabelStyle: {
          color: theme.colors.onBackground,
        },
      }}
    >
      <Tab.Screen
        name={`Do: ${data[0].name}`}
        options={{ tabBarTestID: "first-tab-bar-item" }}
        component={Table}
        initialParams={{
          busRouteDirectionId: data[0].id,
          busId: bus.busId,
          busName: bus.busName,
          direction: data[0].name,
        }}
      />
      <Tab.Screen
        name={`Do: ${data[1].name}`}
        options={{ tabBarTestID: "second-tab-bar-item" }}
        component={Table}
        initialParams={{
          busRouteDirectionId: data[1].id,
          busId: bus.busId,
          busName: bus.busName,
          direction: data[1].name,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
