import { GroupedDeparture } from "../app/buses/schedule";
import {
  Bus,
  BusRouteDirection,
  BusRouteStop,
  BusStop,
  Departure,
} from "../types/databaseTypes";
import { groupByDayOfWeek, groupByHours } from "../utils/reduce";

export const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const entities = {
  buses: "/api/Buses/",
  busStops: "/api/BusStops/",
  busRouteDirections: "/api/BusRouteDirections/",
  busRouteStops: "/api/BusRouteStops/",
  departures: "/api/Departures/",
};

const endpoints = {
  getAllBuses: `${baseURL}${entities.buses}get-all-buses`,
  getAllBusStops: `${baseURL}${entities.busStops}get-all-bus-stops`,
  getBusRouteDirectionByBusId: `${baseURL}${entities.busRouteDirections}get-bus-route-direction-by-busid/`,
  getBusRouteStops: `${baseURL}${entities.busRouteStops}get-bus-route-stops?busRouteDirectionId=`,
  getDepartures: `${baseURL}${entities.departures}get-departures`,
  getDeparturesByBusRouteId: `${baseURL}${entities.departures}get-departures?busRouteId=`,
};

export const fetchBuses = async (): Promise<Bus[]> => {
  const response = await fetch(endpoints.getAllBuses);
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};

export const fetchBusRouteDirections = async (
  busId: number
): Promise<BusRouteDirection[]> => {
  const response = await fetch(
    `${endpoints.getBusRouteDirectionByBusId}${busId}`
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};

export const fetchBusRouteStops = async (
  busRouteDirectionId: number
): Promise<BusRouteStop[]> => {
  const response = await fetch(
    `${endpoints.getBusRouteStops}${busRouteDirectionId}`
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};

export const fetchDepartures = async (...args): Promise<Departure[]> => {
  const paramKeys = [
    "busId",
    "busStopId",
    "busRouteDirectionId",
    "busRoutes",
    "hour",
    "minute",
    "busRouteDirections",
  ];

  const params: Record<string, string | number | boolean> = {};
  args.forEach((value, index) => {
    if (value !== undefined) {
      params[paramKeys[index]] = value;
    }
  });

  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [key, value]) => {
      acc[key] = String(value); // Konwertujemy na string dla URLSearchParams
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const url = `${endpoints.getDepartures}${
    queryString ? `?${queryString}` : ""
  }`;
  const response = await fetch(url);
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};

export const fetchBusRoute = async (
  busRouteId: number
): Promise<Departure[]> => {
  const response = await fetch(
    `${endpoints.getDeparturesByBusRouteId}${busRouteId}&busStops=true`
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};

export const fetchBusStops = async (): Promise<BusStop[]> => {
  const response = await fetch(endpoints.getAllBusStops);
  const result = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return result;
};
