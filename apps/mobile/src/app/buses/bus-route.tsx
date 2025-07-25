import { View, Text, FlatList } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Divider } from "react-native-paper";
import { Departure } from "../../types/databaseTypes";
import api from "../../services/api";
import { ListRenderItem } from "react-native";
import Header from "../../components/Header";

const BusRoutePage = () => {
  const router = useRouter();
  const { busRouteId, busName, direction } = useLocalSearchParams();
  const [busRoute, setBusRoute] = useState<Departure[] | null>(null);

  useEffect(() => {
    fetch(`${api.getDeparturesByBusRouteId}${busRouteId}&busStops=true`)
      .then((res) => res.json())
      .then((json) => {
        setBusRoute(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderItem: ListRenderItem<Departure> = ({
    item,
  }: {
    item: Departure;
  }) => {
    return (
      <>
        <Button key={item.id}>
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
    <View style={{ flex: 1 }}>
      <Header
        title="Trasa autobusu"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
      />
      <View>
        <Text>Linia {busName}</Text>
        <Text>{direction}</Text>
      </View>
      <FlatList data={busRoute} renderItem={renderItem} />
    </View>
  );
};

export default BusRoutePage;
