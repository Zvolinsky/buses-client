import { useState, useEffect, useContext } from "react";
import { View, FlatList, ListRenderItem, StyleSheet } from "react-native";
import { Divider, Text } from "react-native-paper";
import { TouchableOpacity as Button } from "react-native";
import Header from "../../components/Header";
import { ThemeContext } from "../../Layout";

import api from "../../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BusesScreenNameList } from "../BusesScreen";
import { Departure } from "../../types/databaseTypes";

type RouteScreenProps = NativeStackScreenProps<
  BusesScreenNameList,
  "RouteScreen"
>;

type BusRoute = {
  id: number;
  busId: number;
  busStopId: number;
  busStop: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  };
  busRoute: {
    id: number;
    busRouteDirectionId: number;
    dayOfWeek: number;
    routeInfo?: number[];
  };
  busRouteId: number;
  hour: number;
  minute: number;
};

const fetchBusRoute = async (busRouteId: number): Promise<Departure[]> => {
  const response = await fetch(
    `${api.getDeparturesByBusRouteId}${busRouteId}&busStops=true`
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};

const RouteScreen: React.FC<RouteScreenProps> = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { busRouteId, busName, direction } = route.params;
  const [busRoute, setBusRoute] = useState<Departure[] | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBusRoute(busRouteId);
        setBusRoute(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const renderItem: ListRenderItem<Departure> = ({
    item,
  }: {
    item: Departure;
  }) => {
    return (
      <>
        <Button key={item.id} style={styles.button}>
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
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Trasa autobusu"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
      />
      <View style={styles.container}>
        <Text variant="displayMedium">Linia {busName}</Text>
        <Text style={styles.title}>{direction}</Text>
      </View>
      <FlatList data={busRoute} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 22,
    width: "80%",
  },
  button: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default RouteScreen;
