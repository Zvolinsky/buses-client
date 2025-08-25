import { View, Text, TouchableOpacity } from "react-native";
import { IconButton, Divider } from "react-native-paper";
import { useColorScheme } from "nativewind";
import Header from "../components/Header";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

const SettingsPage = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const options = [
    {
      title: "Tryb",
      icon: colorScheme === "dark" ? "weather-sunny" : "weather-night",
      function: () => toggleColorScheme(),
    },
    {
      title: "Powiadomienia",
      icon: "bell",
      function: () => {},
    },
    {
      title: "Język",
      icon: "translate",
      function: () => {},
    },
  ];

  return (
    <View className="flex-1 bg-background">
      <Header
        title="Ustawienia"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => router.back(),
        }}
      />
      {options.map((option, index) => (
        <View key={index}>
          <View
            className="flex-row p-7 items-center justify-between"
            key={index}
          >
            <Text className="text-xl text-text-primary">{option.title}</Text>
            <TouchableOpacity onPress={option.function}>
              <MaterialCommunityIcons
                name={option.icon}
                size={30}
                className="text-primary"
              />
            </TouchableOpacity>
          </View>
          {index !== options.length - 1 && <Divider />}
        </View>
      ))}
    </View>
  );
};

export default SettingsPage;
