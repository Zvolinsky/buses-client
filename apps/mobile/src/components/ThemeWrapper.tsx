// components/ThemeWrapper.tsx
import React from "react";
import { View } from "react-native";
import { useColorScheme } from "nativewind";

interface ThemeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({
  children,
  className = "flex-1",
}) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className={`${className} ${colorScheme === "dark" ? "dark" : ""}`}>
      {children}
    </View>
  );
};

export default ThemeWrapper;
