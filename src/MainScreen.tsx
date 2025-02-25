import { Text } from "react-native-paper";
import { FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { ThemeContext } from "./Layout";
import Header from "./components/Header";

const routes = [
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

const MainScreen = ({ navigation }) => {
  const { theme, setIsDarkMode } = React.useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
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
        renderItem={({ item }) => (
          <Card
            route={item}
            color={theme.colors.primary}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const Card = ({ route, color, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        width: "50%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.navigate(route.screenName)}
    >
      <MaterialCommunityIcons name={route.iconName} size={50} color={color} />
      <Text style={{ fontSize: 16 }}>{route.content}</Text>
    </TouchableOpacity>
  );
};

export default MainScreen;
