import { Text } from "react-native-paper";
import { FlatList, View, StyleSheet, ListRenderItem } from "react-native";
import { TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { ThemeContext } from "./Layout";
import Header from "./components/Header";
import { RootScreenNameList } from "../App";

type RouteItem = {
  id: number;
  content: string;
  iconName: string;
  screenName?: keyof RootScreenNameList;
};

type MainScreenProps = {
  navigation: NavigationProp<RootScreenNameList>;
};

type CardProps = {
  route: RouteItem;
  color: string;
  navigation: NavigationProp<RootScreenNameList>;
};

const routes: RouteItem[] = [
  {
    id: 1,
    content: "Wybierz linię",
    iconName: "bus",
    screenName: "Buses",
  },
  {
    id: 2,
    content: "Wybierz przystanek",
    iconName: "bus-stop",
    screenName: "BusStops",
  },
  {
    id: 3,
    content: "Wyszukaj połączenie",
    iconName: "map-marker-path",
    screenName: "SearchConnection",
  },
  {
    id: 4,
    content: "Mapa",
    iconName: "map",
    screenName: "Map",
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

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const { theme } = React.useContext(ThemeContext);

  const renderCard: ListRenderItem<RouteItem> = ({
    item,
  }: {
    item: RouteItem;
  }) => {
    return (
      <Card route={item} color={theme.colors.primary} navigation={navigation} />
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title="MKS Mobile"
        rightHeader={{
          icon: "cog",
          onPress: () => navigation.navigate("Settings"),
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

const Card: React.FC<CardProps> = ({ route, color, navigation }) => {
  const handlePress = (): void => {
    if (route.screenName) {
      navigation.navigate(route.screenName);
    } else {
      console.warn("Screen name not provided for route:", route.content);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <MaterialCommunityIcons name={route.iconName} size={50} color={color} />
      <Text style={styles.cardText}>{route.content}</Text>
    </TouchableOpacity>
  );
};

//Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: "50%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
  },
});

export default MainScreen;
