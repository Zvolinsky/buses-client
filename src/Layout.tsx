import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
} from "react-native-paper";

export const ThemeContext = React.createContext({
  theme: MD3LightTheme,
  setIsDarkMode: (isDarkMode: boolean) => {},
});

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const colorScheme = useColorScheme();
  const theme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  React.useEffect(() => {
    if (colorScheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [colorScheme]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeContext.Provider value={{ theme, setIsDarkMode }}>
          {children}
        </ThemeContext.Provider>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Layout;
