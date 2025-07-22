import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
//import screens
import BusesList from "./BusesStackNav/BusesList";
import BusRouteStopsScreen from "./BusesStackNav/BusRouteStopsScreen";
import ScheduleScreen from "./BusesStackNav/ScheduleScreen";
import RouteScreen from "./BusesStackNav/RouteScreen";

export type BusesScreenNameList = {
  BusesList: undefined;
  BusRouteStopsScreen: { busId: number; busName: string };
  ScheduleScreen: {
    busId: number;
    busStopId: number;
    busName: string;
    busRouteDirectionId: number;
    direction: string;
  };
  RouteScreen: {
    busId: number;
    busName: string;
    busStopId: number;
    direction: string;
    busRouteId: number;
  };
};

type RouteItem = {
  id: number;
  name: keyof BusesScreenNameList;
  title: string;
  component: React.FC<NativeStackScreenProps<BusesScreenNameList>>;
};

const routes: RouteItem[] = [
  {
    id: 1,
    name: "BusesList",
    title: "Wybierz linię",
    component: BusesList,
  },
  {
    id: 2,
    name: "BusRouteStopsScreen",
    title: "Wybierz przystanek",
    component: BusRouteStopsScreen,
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

const Stack = createNativeStackNavigator<BusesScreenNameList>();

const BusesScreen: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      {routes.map((item) => (
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
