import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ListRenderItem } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
    <View style={{ flex: 1 }}>
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
    <Pressable onPress={handlePress}>
      <MaterialCommunityIcons name={route.iconName} size={50} />
      <Text>{route.content}</Text>
    </Pressable>
  );
};

export default HomePage;
