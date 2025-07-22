import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import { ThemeContext } from "../../Layout";
import { BusesScreenNameList } from "../BusesScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BusRouteDirection } from "../../types/databaseTypes";
//import components
import TabNavigator from "../../components/TabNavigator";

type BusRouteStopsScreenProps = NativeStackScreenProps<
  BusesScreenNameList,
  "BusRouteStopsScreen"
>;

const fetchBusRouteDirections = async (
  busId: number
): Promise<BusRouteDirection[]> => {
  const response = await fetch(`${api.getBusRouteDirectionByBusId}${busId}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};

const BusRouteStopsScreen: React.FC<BusRouteStopsScreenProps> = ({
  route,
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);
  const { busId, busName } = route.params;
  const [busRouteDirections, setBusRouteDirections] = useState<
    BusRouteDirection[] | null
  >(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBusRouteDirections(busId);
        setBusRouteDirections(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Wybierz przystanek"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
      />
      <View style={styles.container}>
        <Text variant="displayMedium">Linia {busName}</Text>
        {busRouteDirections && busRouteDirections.length > 1 && (
          <View>
            <Text style={{ fontSize: 18 }}>Kierunki:</Text>
            <Text style={styles.title}>
              {busRouteDirections[0].name} – {busRouteDirections[1].name}
            </Text>
          </View>
        )}
      </View>

      {busRouteDirections && (
        <TabNavigator data={busRouteDirections} bus={route.params} />
      )}
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
});

export default BusRouteStopsScreen;
