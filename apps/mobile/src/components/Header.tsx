import { View } from "react-native";
import React, { useContext } from "react";
import { IconButton, Text } from "react-native-paper";
import { ThemeContext } from "../Layout";

type HeaderProps = {
  title: string;
  leftHeader?: {
    icon: string;
    onPress: () => void;
  };
  rightHeader?: {
    icon: string;
    onPress: () => void;
  };
};

const Header = ({ title, leftHeader, rightHeader }: HeaderProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {leftHeader && (
          <IconButton
            icon={leftHeader.icon}
            size={25}
            onPress={() => leftHeader.onPress()}
          />
        )}
        <Text style={{ fontSize: 20, left: 10 }}>{title}</Text>
      </View>

      {rightHeader && (
        <IconButton
          icon={rightHeader.icon}
          size={25}
          onPress={() => rightHeader.onPress()}
        />
      )}
    </View>
  );
};

export default Header;
