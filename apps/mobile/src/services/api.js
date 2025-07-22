export const baseURL = process.env.EXPO_PUBLIC_API_URL;

export const entities = {
  buses: "/api/Buses/",
  busStops: "/api/BusStops/",
  busRouteDirections: "/api/BusRouteDirections/",
  busRouteStops: "/api/BusRouteStops/",
  departures: "/api/Departures/",
};

export default {
  getAllBuses: `${baseURL}${entities.buses}get-all-buses`,
  getAllBusStops: `${baseURL}${entities.busStops}get-all-bus-stops`,
  getBusRouteDirectionByBusId: `${baseURL}${entities.busRouteDirections}get-bus-route-direction-by-busid/`,
  getBusRouteStops: `${baseURL}${entities.busRouteStops}get-bus-route-stops?busRouteDirectionId=`,
  getDepartures: `${baseURL}${entities.departures}get-departures`,
  getDeparturesByBusRouteId: `${baseURL}${entities.departures}get-departures?busRouteId=`,
};
