import { Stack } from "expo-router";
import "./global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeWrapper from "../components/ThemeWrapper";
import { StatusBar, View } from "react-native";
import { useColorScheme } from "nativewind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <View className={`flex-1 ${colorScheme === "dark" ? "dark" : ""}`}>
        <SafeAreaView className="flex-1">
          <StatusBar className={colorScheme === "dark" ? "light" : "dark"} />
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </View>
    </QueryClientProvider>
  );
}
