import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { ThemeContext } from "../Layout";

import api from "../services/api";

const Tab = createMaterialTopTabNavigator();

const Table = ({ navigation, route }) => {
  const { theme } = useContext(ThemeContext);
  const { busRouteDirectionId, busId, busName, direction } = route.params;
  const [busRouteStops, setBusRouteStops] = useState([]);
  function getBusRouteStops(busRouteDirectionId) {
    fetch(`${api.getBusRouteStops}${busRouteDirectionId}`)
      .then((response) => response.json())
      .then((json) => {
        setBusRouteStops(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getBusRouteStops(busRouteDirectionId);
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

const TabNavigator = ({ data, bus }) => {
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
          color: theme.colors.text,
        },
      }}
    >
      <Tab.Screen
        name={`Do: ${data[0].name}`}
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
