import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchBusRouteDirections } from "../../services/api";
import Header from "../../components/Header";
import Accordion from "../../components/Accordion";
import { useQuery } from "@tanstack/react-query";

const BusRoutesPage = () => {
  const router = useRouter();
  const { busId, busName } = useLocalSearchParams();
  const { data: busRouteDirections, isLoading } = useQuery({
    queryFn: () => fetchBusRouteDirections(busId as unknown as number),
    queryKey: ["busRouteDirections", busId],
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg font-semibold text-primary">Ładowanie...</Text>
      </View>
    );
  }

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
