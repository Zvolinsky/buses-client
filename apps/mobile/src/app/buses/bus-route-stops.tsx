import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchBusRouteDirections } from "../../services/api";
import Accordion from "../../components/Accordion";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";

const renderDirections = (busRouteDirections) =>
  busRouteDirections.map((direction) => (
    <Accordion
      key={direction.id}
      data={{
        busRouteDirectionId: direction.id,
        direction: direction.name,
      }}
    />
  ));

const BusRoutesPage = () => {
  const { busId, busName } = useLocalSearchParams();
  const { data: busRouteDirections, isLoading } = useQuery({
    queryFn: () => fetchBusRouteDirections(busId as unknown as number),
    queryKey: ["busRouteDirections", busId],
  });

  if (isLoading) return <Loader />;
  return (
    <View className="bg-background flex-1">
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
          <View>{renderDirections(busRouteDirections)}</View>
        )}
      </ScrollView>
    </View>
  );
};

export default BusRoutesPage;
