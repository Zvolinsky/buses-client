import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
//screens
import BusStopsList from "./BusStopsStackNav/BusStopsList";
import ScheduleScreen from "./BusStopsStackNav/ScheduleScreen";

export type BusStopsScreenNameList = {
  BusStopsList: undefined;
  ScheduleScreen: { busStopId: number; busStopName: string };
};

type RouteItem = {
  id: number;
  name: keyof BusStopsScreenNameList;
  title: string;
  component: React.FC<NativeStackScreenProps<BusStopsScreenNameList>>;
};

const routes: RouteItem[] = [
  {
    id: 1,
    name: "BusStopsList",
    title: "Wybierz linię",
    component: BusStopsList,
  },
  {
    id: 2,
    name: "ScheduleScreen",
    title: "Wybierz przystanek",
    component: ScheduleScreen,
  },
];

const Stack = createNativeStackNavigator<BusStopsScreenNameList>();

const BusStopsScreen = () => {
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

export default BusStopsScreen;
