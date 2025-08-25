import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
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
        <TouchableOpacity
          key={item.id}
          className="p-6 flex-row justify-between"
        >
          <Text className="text-text-primary">{item.busStop.name}</Text>
          <View>
            <Text className="text-gray-600 dark:text-gray-400">
              {String(item.hour).padStart(2, "0")}:
              {String(item.minute).padStart(2, "0")}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View className="bg-background flex-1">
      <Header
        title={`Trasa linii ${busName}`}
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
        rightHeader={{
          icon: "cog",
          onPress: () => router.push("settings"),
        }}
      />
      <ScrollView>
        <View className="gap-3 p-7">
          <Text className="text-text-primary text-xl">{direction}</Text>
        </View>
        <FlatList
          data={busRoute}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View className="h-0.5 bg-slate-500"></View>
          )}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default BusRoutePage;
