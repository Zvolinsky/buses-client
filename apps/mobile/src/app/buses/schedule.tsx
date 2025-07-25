import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import routeInfo, { infoDescription } from "../../enums/routeInfo";
import Header from "../../components/Header";
import { Button, DataTable } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../services/api";
import { groupByHours } from "../../utils/reduce";

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

const SchedulePage = () => {
  const { busId, busStopId, busName, busRouteDirectionId, direction } =
    useLocalSearchParams();
  const router = useRouter();
  const [departures, setDepartures] = useState<GroupedDeparture[] | null>(null);

  useEffect(() => {
    fetch(
      `${api.getDepartures}?busId=${busId}&busStopId=${busStopId}&busRouteDirectionId=${busRouteDirectionId}&busRoutes=true`
    )
      .then((res) => res.json())
      .then((json) => {
        const result = groupByHours(json);
        setDepartures(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderDepartureButtons = (item: GroupedDeparture, dayOfWeek: number) =>
    item.departure?.map(
      (time, index) =>
        time.dayOfWeek == dayOfWeek && (
          <Button
            key={index}
            onPress={() =>
              router.push({
                pathname: "/buses/bus-route",
                params: {
                  busId: busId,
                  busStopId: busStopId,
                  busName: busName,
                  direction: direction,
                  busRouteId: time.busRouteId,
                },
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
    <View style={{ flex: 1 }}>
      <Header
        title="Rozkład jazdy"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
      />
      <ScrollView>
        <View style={{ padding: 20, gap: 20 }}>
          <Text>Linia {busName}</Text>
          <View>
            <Text style={{ fontSize: 18 }}>Kierunek:</Text>
            <Text style={{ fontSize: 22, width: "80%" }}>{direction}</Text>
          </View>
        </View>

        <DataTable style={{ height: 500 }}>
          <DataTable.Header>
            <DataTable.Title>Gdz.</DataTable.Title>
            <DataTable.Title>Pn. - Pt.</DataTable.Title>
            <DataTable.Title>Soboty</DataTable.Title>
            <DataTable.Title>Święta</DataTable.Title>
          </DataTable.Header>
          <ScrollView nestedScrollEnabled>
            {departures?.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.hour}</DataTable.Cell>
                <DataTable.Cell>
                  {renderDepartureButtons(item, 0)}
                </DataTable.Cell>
                <DataTable.Cell>
                  {renderDepartureButtons(item, 1)}
                </DataTable.Cell>
                <DataTable.Cell>
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

export default SchedulePage;
