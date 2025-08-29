import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Departure } from "../../types/databaseTypes";
import { fetchBusRoute } from "../../services/api";
import { ListRenderItem } from "react-native";
import { useQuery } from "@tanstack/react-query";

const BusRoutePage = () => {
  const { busRouteId, busName, direction } = useLocalSearchParams();

  const { data: busRoute, isLoading } = useQuery({
    queryFn: () => fetchBusRoute(busRouteId as unknown as number),
    queryKey: ["busRoute"],
  });

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
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg font-semibold text-primary">Ładowanie...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: `Trasa linii ${busName}` }} />
      <View className="bg-background flex-1">
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
    </>
  );
};

export default BusRoutePage;
