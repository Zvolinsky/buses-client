import { Stack, useRouter } from "expo-router";
import "./global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { useColorScheme, cssInterop } from "nativewind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SCREEN_TITLES } from "../config/screenTitles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <View className={`flex-1 ${colorScheme === "dark" ? "dark" : ""}`}>
        <SafeAreaView className="flex-1">
          <StatusBar className={colorScheme === "dark" ? "light" : "dark"} />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#1d1d1d" : "#ffffff", // gray-800 : white
              },
              headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
              headerTitleStyle: {
                color: colorScheme === "dark" ? "#ffffff" : "#000000",
              },
              headerRight: () => (
                <TouchableOpacity onPress={() => router.push("settings")}>
                  <MaterialCommunityIcons
                    name="cog"
                    size={30}
                    className="text-secondary"
                  />
                </TouchableOpacity>
              ),
            }}
          >
            {SCREEN_TITLES.map((screen) => (
              <Stack.Screen
                key={screen.name}
                name={screen.name}
                options={{ title: screen.title }}
              />
            ))}
          </Stack>
        </SafeAreaView>
      </View>
    </QueryClientProvider>
  );
}

cssInterop(MaterialCommunityIcons, {
  className: "style",
});
