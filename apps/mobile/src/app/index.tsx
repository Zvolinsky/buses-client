import { View, Text, TouchableOpacity, FlatList } from "react-native";
import "./global.css";
import React from "react";
import { ListRenderItem } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";

type RouteItem = {
  id: number;
  content: string;
  iconName: string;
  screenName?: Href;
};

type CardProps = {
  route: RouteItem;
  router: any;
};

const routes: RouteItem[] = [
  {
    id: 1,
    content: "Wybierz linię",
    iconName: "bus",
    screenName: "/buses",
  },
  {
    id: 2,
    content: "Wybierz przystanek",
    iconName: "bus-stop",
    screenName: "/bus-stops",
  },
  {
    id: 3,
    content: "Wyszukaj połączenie",
    iconName: "map-marker-path",
    screenName: "/search-connection",
  },
  {
    id: 4,
    content: "Mapa",
    iconName: "map",
    screenName: "/map",
  },
  {
    id: 5,
    content: "Kup bilet",
    iconName: "ticket-outline",
  },
  {
    id: 6,
    content: "Moje konto",
    iconName: "account-circle",
  },
];

const Card: React.FC<CardProps> = ({ route, router }) => {
  const handlePress = (): void => {
    if (route.screenName) {
      router.push(route.screenName);
    } else {
      console.warn("Screen name not provided for route:", route.content);
    }
  };

  return (
    <TouchableOpacity
      className="w-1/2 h-[200] justify-center items-center"
      onPress={handlePress}
    >
      <MaterialCommunityIcons
        name={route.iconName as any}
        size={50}
        className="text-primary"
      />
      <Text className="text-lg text-text-primary">{route.content}</Text>
    </TouchableOpacity>
  );
};

const renderCard: ListRenderItem<RouteItem> = ({
  item,
}: {
  item: RouteItem;
}) => {
  const router = useRouter();
  return <Card route={item} router={router} />;
};

const HomePage = () => {
  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={routes}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        className="m-2"
      />
    </View>
  );
};

export default HomePage;
