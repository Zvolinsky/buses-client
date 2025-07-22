import { useColorScheme } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const ThemeContext = React.createContext({
  theme: MD3LightTheme,
  setIsDarkMode: (isDarkMode: boolean) => {},
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
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
