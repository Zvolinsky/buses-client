import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import screens
import BusesList from "./BusesStackNav/BusesList";
import BusRouteScreen from "./BusesStackNav/BusRouteScreen";
import ScheduleScreen from "./BusesStackNav/ScheduleScreen";
import RouteScreen from "./BusesStackNav/RouteScreen";
import Header from "../components/Header";

const routes = [
  {
    id: 1,
    name: "BusesList",
    title: "Wybierz linię",
    component: BusesList,
  },
  {
    id: 2,
    name: "BusRouteScreen",
    title: "Wybierz przystanek",
    component: BusRouteScreen,
  },
  {
    id: 3,
    name: "ScheduleScreen",
    title: "Rozkład jazdy",
    component: ScheduleScreen,
  },
  {
    id: 4,
    name: "RouteScreen",
    title: "Trasa autobusu",
    component: RouteScreen,
  },
];

const Stack = createNativeStackNavigator();

const BusesScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      {routes.map((item, index) => (
        <Stack.Screen
          key={item.id}
          name={item.name}
          component={item.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default BusesScreen;
