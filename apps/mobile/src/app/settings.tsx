import { View, Text } from "react-native";
import { IconButton, Divider } from "react-native-paper";
import Header from "../components/Header";
import React from "react";
import { router } from "expo-router";

const SettingsPage = () => {
  const options = [
    {
      title: "Tryb",
      icon: "weather-night",
      function: () => {},
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
    <View style={{ flex: 1 }}>
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
            style={{
              flexDirection: "row",
              padding: 20,
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Text style={{ fontSize: 17 }}>{option.title}</Text>
            <IconButton
              testID="actual-icon-button"
              icon={option.icon}
              size={29}
              onPress={option.function}
            />
          </View>
          {index !== options.length - 1 && <Divider />}
        </View>
      ))}
    </View>
  );
};

export default SettingsPage;
