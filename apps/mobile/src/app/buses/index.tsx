import {
  View,
  Text,
  ListRenderItem,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Bus } from "../../types/databaseTypes";
import { fetchBuses } from "../../services/api";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { useState } from "react";
import Filter from "../../components/Filter";

const renderItem: ListRenderItem<Bus> = ({ item }: { item: Bus }) => {
  const router = useRouter();
  return (
    <View className="w-1/4 ">
      <TouchableOpacity
        key={item.id}
        className="h-11 w-5/6  bg-primary items-center justify-center self-center rounded-md"
        onPress={() =>
          router.push({
            pathname: "/buses/bus-route-stops",
            params: { busId: item.id, busName: item.number },
          })
        }
      >
        <Text className="text-lg font-semibold text-white dark:text-black">
          {item.number}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const BusesPage = () => {
  const { data: buses, isLoading } = useQuery({
    queryFn: () => fetchBuses(),
    queryKey: ["buses"],
  });
  const [filteredBuses, setFilteredBuses] = useState<Bus[] | null>(null);

  if (isLoading) return <Loader />;
  return (
    <View className="flex-1 bg-background">
      <Filter filterFunction={setFilteredBuses} data={buses} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        className="p-3"
        ItemSeparatorComponent={() => <View className="h-5">{""}</View>}
        data={filteredBuses ? filteredBuses : buses}
        renderItem={renderItem}
        horizontal={false}
        numColumns={4}
      />
    </View>
  );
};

export default BusesPage;
