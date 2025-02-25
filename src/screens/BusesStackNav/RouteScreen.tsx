import { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { Divider, Text } from "react-native-paper";
import { TouchableOpacity as Button } from "react-native";
import Header from "../../components/Header";
import { ThemeContext } from "../../Layout";

import api from "../../services/api";

const RouteScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { busRouteId, busName, direction } = route.params;
  const [busRoute, setBusRoute] = useState([]);

  function getBusRoute(busRouteId) {
    fetch(`${api.getDeparturesByBusRouteId}${busRouteId}&busStops=true`)
      .then((response) => response.json())
      .then((json) => {
        setBusRoute(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    getBusRoute(busRouteId);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Trasa autobusu"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
      />
      <View style={{ padding: 20, gap: 20 }}>
        <Text variant="displayMedium">Linia {busName}</Text>
        <Text style={{ fontSize: 22, width: "80%" }}>{direction}</Text>
      </View>
      <FlatList
        data={busRoute}
        renderItem={({ item }) => (
          <>
            <Button
              key={item.id}
              style={{
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onPress={
                () => {}
                // navigation.navigate("ScheduleScreen", {
                //   busId: item.busId,
                //   busStopId: item.busStopId,
                //   busName: busName,
                //   direction: direction,
                // })
              }
            >
              <Text>{item.busStop.name}</Text>
              <View>
                <Text>
                  {String(item.hour).padStart(2, "0")}:
                  {String(item.minute).padStart(2, "0")}
                </Text>
              </View>
            </Button>
            <Divider leftInset bold />
          </>
        )}
      />
    </View>
  );
};

export default RouteScreen;
