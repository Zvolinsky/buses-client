import { useState, useEffect, useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import routeInfo, { infoDescription } from "../../enums/routeInfo";
import { groupByHours } from "../../utils/reduce";
import api from "../../services/api";
import Header from "../../components/Header";
import { ThemeContext } from "../../Layout";
import { BusesScreenNameList } from "../BusesScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ScheduleScreenProps = NativeStackScreenProps<
  BusesScreenNameList,
  "ScheduleScreen"
>;

type GroupedDeparture = {
  id: number;
  hour: string;
  departure: {
    dayOfWeek: number;
    minute: number;
    busRouteId: number;
    routeInfo?: number[];
  }[];
};

const fetchDepartures = async (
  busId: number,
  busStopId: number,
  busRouteDirectionId: number
): Promise<GroupedDeparture[]> => {
  const response = await fetch(
    `${api.getDepartures}?busId=${busId}&busStopId=${busStopId}&busRouteDirectionId=${busRouteDirectionId}&busRoutes=true`
  );
  const json = await response.json();
  const result = groupByHours(json);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};

const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  route,
  navigation,
}) => {
  const { theme } = useContext(ThemeContext);
  const { busId, busStopId, busName, busRouteDirectionId, direction } =
    route.params;
  const [departures, setDepartures] = useState<GroupedDeparture[] | null>(null);

  useEffect(() => {
    setDepartures(null);
    const loadData = async () => {
      try {
        const data = await fetchDepartures(
          busId,
          busStopId,
          busRouteDirectionId
        );
        setDepartures(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const renderDepartureButtons = (item: GroupedDeparture, dayOfWeek: number) =>
    item.departure?.map(
      (time, index) =>
        time.dayOfWeek == dayOfWeek && (
          <Button
            key={index}
            labelStyle={styles.timeButton}
            onPress={() =>
              navigation.navigate("RouteScreen", {
                busId: busId,
                busStopId: busStopId,
                busName: busName,
                direction: direction,
                busRouteId: time.busRouteId,
              })
            }
          >
            {String(time.minute).padStart(2, "0")}
            {time.routeInfo?.map((info) => (
              <Text key={info} style={{ fontSize: 15 }}>
                {routeInfo[info]}
              </Text>
            ))}
          </Button>
        )
    );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Rozkład jazdy"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
        }}
      />
      <ScrollView>
        <View style={{ padding: 20, gap: 20 }}>
          <Text variant="displayMedium">Linia {busName}</Text>
          <View>
            <Text style={{ fontSize: 18 }}>Kierunek:</Text>
            <Text style={{ fontSize: 22, width: "80%" }}>{direction}</Text>
          </View>
        </View>

        <DataTable style={{ height: 500 }}>
          <DataTable.Header>
            <DataTable.Title>Gdz.</DataTable.Title>
            <DataTable.Title style={styles.weekday}>Pn. - Pt.</DataTable.Title>
            <DataTable.Title style={styles.weekend}>Soboty</DataTable.Title>
            <DataTable.Title style={styles.weekend}>Święta</DataTable.Title>
          </DataTable.Header>
          <ScrollView nestedScrollEnabled>
            {departures?.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.hour}</DataTable.Cell>
                <DataTable.Cell style={styles.weekday}>
                  {renderDepartureButtons(item, 0)}
                </DataTable.Cell>
                <DataTable.Cell style={styles.weekend}>
                  {renderDepartureButtons(item, 1)}
                </DataTable.Cell>
                <DataTable.Cell style={styles.weekend}>
                  {renderDepartureButtons(item, 2)}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
        <View style={{ margin: 20 }}>
          <Text>(Z) - {infoDescription.Z}</Text>
          <Text>+ - {infoDescription.plus}</Text>
          <Text>2-5 - {infoDescription.dwapięć}</Text>
          <Text>6ś - {infoDescription.sześćś}</Text>
          <Text>D - {infoDescription.D}</Text>
          <Text>S - {infoDescription.S}</Text>
          <Text>b - {infoDescription.b}</Text>
          <Text>g - {infoDescription.g}</Text>
          <Text>m - {infoDescription.m}</Text>
          <Text>e - {infoDescription.e}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  weekday: {
    flex: 3,
  },
  weekend: {
    flex: 1.25,
  },
  timeButton: {
    borderColor: "#96c",
    padding: 4,
    borderRadius: 10,
    fontSize: 20,
    height: 40,
    verticalAlign: "middle",
  },
});

export default ScheduleScreen;
