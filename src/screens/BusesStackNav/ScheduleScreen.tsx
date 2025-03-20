import { useState, useEffect, useContext } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { Button, DataTable, Text } from "react-native-paper";
import routeInfo, { infoDescription } from "../../enums/routeInfo";
import { groupByHours } from "../../utils/reduce";
import api from "../../services/api";
import Header from "../../components/Header";
import { ThemeContext } from "../../Layout";

const ScheduleScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { busId, busStopId, busName, direction } = route.params;
  const [departures, setDepartures] = useState(null);
  const [departureInfo, setDepartureInfo] = useState(null);

  function getDepartures(busId, busStopId) {
    fetch(
      `${api.getDepartures}?busId=${busId}&busStopId=${busStopId}&busRoutes=true`
    )
      .then((response) => response.json())
      .then((json) => {
        let groupedContent = groupByHours(json);
        setDepartures(groupedContent);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    setDepartures(null);
    getDepartures(busId, busStopId);
  }, []);

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
          <Text style={{ fontSize: 22, width: "80%" }}>{direction}</Text>
        </View>

        <DataTable style={{ height: 500 }}>
          <DataTable.Header>
            <DataTable.Title>Gdz.</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Pn. - Pt.</DataTable.Title>
            <DataTable.Title>Soboty</DataTable.Title>
            <DataTable.Title>Święta</DataTable.Title>
          </DataTable.Header>
          <ScrollView nestedScrollEnabled>
            {departures != null &&
              departures?.map((item) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.hour}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2 }}>
                    {item.departure?.map(
                      (minute, index) =>
                        minute.dayOfWeek == 0 && (
                          <Button
                            key={index}
                            labelStyle={{
                              borderColor: "#96c",
                              padding: 4,
                              borderRadius: 10,
                              fontSize: 20,
                              height: 40,
                              verticalAlign: "middle",
                            }}
                            onPress={() =>
                              navigation.navigate("RouteScreen", {
                                busId: busId,
                                busStopId: busStopId,
                                busName: busName,
                                direction: direction,
                                busRouteId: minute.busRouteId,
                              })
                            }
                          >
                            {String(minute.minute).padStart(2, "0")}
                            {minute.routeInfo?.map((info) => (
                              <Text style={{ fontSize: 15 }}>
                                {routeInfo[info]}
                              </Text>
                            ))}
                          </Button>
                        )
                    )}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {item.departure?.map(
                      (minute, index) =>
                        minute.dayOfWeek == 1 && (
                          <Button
                            key={index}
                            labelStyle={{
                              borderColor: "#96c",
                              padding: 4,
                              borderRadius: 10,
                              fontSize: 20,
                              height: 40,
                              verticalAlign: "middle",
                            }}
                            onPress={() =>
                              navigation.navigate("RouteScreen", {
                                busId: busId,
                                busStopId: busStopId,
                                busName: busName,
                                direction: direction,
                                busRouteId: minute.busRouteId,
                              })
                            }
                          >
                            {String(minute.minute).padStart(2, "0")}
                            {minute.routeInfo?.map((info) => (
                              <Text style={{ fontSize: 15 }}>
                                {routeInfo[info]}
                              </Text>
                            ))}
                          </Button>
                        )
                    )}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {item.departure?.map(
                      (minute, index) =>
                        minute.dayOfWeek == 2 && (
                          <Button
                            key={index}
                            labelStyle={{
                              borderColor: "#96c",
                              padding: 4,
                              borderRadius: 10,
                              fontSize: 20,
                              height: 40,
                              verticalAlign: "middle",
                            }}
                            onPress={() =>
                              navigation.navigate("RouteScreen", {
                                busId: busId,
                                busStopId: busStopId,
                                busName: busName,
                                direction: direction,
                                busRouteId: minute.busRouteId,
                              })
                            }
                          >
                            {String(minute.minute).padStart(2, "0")}
                            {minute.routeInfo?.map((info) => (
                              <Text style={{ fontSize: 15 }}>
                                {routeInfo[info]}
                              </Text>
                            ))}
                          </Button>
                        )
                    )}
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

export default ScheduleScreen;
