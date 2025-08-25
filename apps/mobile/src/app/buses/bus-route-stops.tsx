import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../services/api";
import Header from "../../components/Header";
import { BusRouteDirection } from "../../types/databaseTypes";
import Accordion from "../../components/Accordion";

const BusRoutesPage = () => {
  const router = useRouter();
  const { busId, busName } = useLocalSearchParams();
  const [busRouteDirections, setBusRouteDirections] = useState<
    BusRouteDirection[] | null
  >(null);
  useEffect(() => {
    fetch(`${api.getBusRouteDirectionByBusId}${busId}`)
      .then((res) => res.json())
      .then((json) => {
        setBusRouteDirections(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View className="bg-background flex-1">
      <Header
        title="Wybierz przystanek"
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
          <Text className="text-text-primary text-3xl">Linia {busName}</Text>
          {busRouteDirections && busRouteDirections.length > 1 && (
            <View className="gap-1">
              <Text className="text-text-primary text-2xl">Kierunki:</Text>
            </View>
          )}
        </View>
        {busRouteDirections && (
          <View>
            <Accordion
              data={{
                busRouteDirectionId: busRouteDirections[0].id,
                direction: busRouteDirections[0].name,
              }}
            />
            <Accordion
              data={{
                busRouteDirectionId: busRouteDirections[1].id,
                direction: busRouteDirections[1].name,
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BusRoutesPage;
