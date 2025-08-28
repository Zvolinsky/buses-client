import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { cssInterop } from "nativewind";
import "./global.css";
import React from "react";
import Header from "../components/Header";
import { ListRenderItem } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Href, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

cssInterop(MaterialCommunityIcons, {
  className: {
    target: "style",
    nativeStyleToProp: { height: true, width: true, size: true },
  },
});

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

const HomePage = () => {
  const router = useRouter();
  const renderCard: ListRenderItem<RouteItem> = ({
    item,
  }: {
    item: RouteItem;
  }) => {
    return <Card route={item} router={router} />;
  };

  return (
    <View className="flex-1 bg-background">
      <Header
        title="MKS Mobile"
        rightHeader={{
          icon: "cog",
          onPress: () => router.push("settings"),
        }}
      />
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
        name={route.iconName}
        size={50}
        className="text-primary"
      />
      <Text className="text-lg text-text-primary">{route.content}</Text>
    </TouchableOpacity>
  );
};

export default HomePage;
