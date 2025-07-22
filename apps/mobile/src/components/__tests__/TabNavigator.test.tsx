import React from "react";
import { render, screen } from "@testing-library/react-native";
import TabNavigator from "../TabNavigator";
import { NavigationContainer } from "@react-navigation/native";

describe("TabNavigator", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  const data = [
    { bus: null, busId: 1, id: 1, name: "MEDYNIA GŁOG., ZADWÓR PĘTLA" },
    { bus: null, busId: 1, id: 2, name: "RZESZÓW D.A." },
  ];
  const bus = { busId: 1, busName: "202" };

  render(
    <NavigationContainer>
      <TabNavigator data={data} bus={bus} />
    </NavigationContainer>
  );
  it("passes bus stop names as an argument and renders them correctly", () => {
    const firstElement = screen.getByTestId("first-tab-bar-item");
    const secondElement = screen.getByTestId("second-tab-bar-item");
    expect(firstElement).toHaveTextContent(
      "Do: MEDYNIA GŁOG., ZADWÓR PĘTLADo: MEDYNIA GŁOG., ZADWÓR PĘTLA"
    );
    expect(secondElement).toHaveTextContent("Do: RZESZÓW D.A.Do: RZESZÓW D.A.");
  });
});
