import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Header from "../Header";
import { ThemeContext } from "../../Layout";
import { MD3DarkTheme } from "react-native-paper";

describe("Header Component", () => {
  const theme = MD3DarkTheme;
  const setIsDarkMode = jest.fn();
  it("renders the title correctly", () => {
    const { getByText } = render(
      <ThemeContext.Provider value={{ theme, setIsDarkMode }}>
        <Header title="Test Title" />
      </ThemeContext.Provider>
    );

    expect(getByText("Test Title")).toBeTruthy();
  });

  it("renders left header button and triggers onPress", () => {
    const leftHeaderPressMock = jest.fn();
    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme, setIsDarkMode }}>
        <Header
          title="Test Title"
          leftHeader={{ icon: "menu", onPress: leftHeaderPressMock }}
        />
      </ThemeContext.Provider>
    );

    const leftButton = getByTestId("icon-button");
    fireEvent.press(leftButton);
    expect(leftHeaderPressMock).toHaveBeenCalled();
  });

  it("renders right header button and triggers onPress", () => {
    const rightHeaderPressMock = jest.fn();
    const { getByTestId } = render(
      <ThemeContext.Provider value={{ theme, setIsDarkMode }}>
        <Header
          title="Test Title"
          rightHeader={{ icon: "settings", onPress: rightHeaderPressMock }}
        />
      </ThemeContext.Provider>
    );

    const rightButton = getByTestId("icon-button");
    fireEvent.press(rightButton);
    expect(rightHeaderPressMock).toHaveBeenCalled();
  });
});
