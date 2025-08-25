import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import { BusStop } from "../../types/databaseTypes";
import { useRouter } from "expo-router";
import Map from "../../components/Map";

const MapPage = () => {
  const router = useRouter();
  const [busStops, setBusStops] = useState<BusStop[] | null>(null);

  useEffect(() => {
    fetch(api.getAllBusStops)
      .then((response) => response.json())
      .then((json) => {
        setBusStops(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Wyszukaj połączenie"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
        rightHeader={{
          icon: "cog",
          onPress: () => router.push("settings"),
        }}
      />
      <Map setter={false} busStops={busStops} />
    </View>
  );
};

export default MapPage;
