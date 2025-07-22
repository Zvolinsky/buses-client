import { View } from "react-native";
import { Divider, Icon, IconButton, Text } from "react-native-paper";
import React from "react";
import { ThemeContext } from "../Layout";
import Header from "../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootScreenNameList } from "../../App";

type SettingsScreenProps = NativeStackScreenProps<
  RootScreenNameList,
  "Settings"
>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { theme, setIsDarkMode } = React.useContext(ThemeContext);
  const options = [
    {
      title: "Tryb",
      icon: !theme.dark ? "weather-night" : "weather-sunny",
      function: () => setIsDarkMode(!theme.dark),
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
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Header
        title="Ustawienia"
        leftHeader={{
          icon: "arrow-left",
          onPress: () => navigation.goBack(),
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

export default SettingsScreen;
