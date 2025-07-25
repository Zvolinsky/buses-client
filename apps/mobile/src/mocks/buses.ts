import { Bus, BusRouteDirection } from "../types/databaseTypes";

export const mockBuses: Bus[] = [
  {
    id: 3,
    number: "108",
  },
  {
    id: 4,
    number: "193",
  },
  {
    id: 5,
    number: "200",
  },
  {
    id: 6,
    number: "201",
  },
  {
    id: 1,
    number: "202",
  },
  {
    id: 7,
    number: "203",
  },
  {
    id: 8,
    number: "204",
  },
  {
    id: 9,
    number: "205",
  },
  {
    id: 10,
    number: "206",
  },
  {
    id: 11,
    number: "207",
  },
  {
    id: 12,
    number: "208",
  },
  {
    id: 13,
    number: "209",
  },
];

export const mockBusRouteDirections: BusRouteDirection[] = [
  {
    id: 1,
    name: "MEDYNIA GŁOG., ZADWÓR PĘTLA",
    busId: 1,
    bus: null,
  },
  {
    id: 2,
    name: "RZESZÓW D.A.",
    busId: 1,
    bus: null,
  },
];
