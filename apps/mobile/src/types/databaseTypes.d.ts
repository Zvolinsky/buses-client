export type Bus = {
  id: number;
  number: string;
};

export type BusRouteDirection = {
  id: number;
  name: string;
  busId: number;
  bus?: Bus;
};

export type BusRouteStop = {
  id: number;
  busRouteDirectionId: number;
  busStop: BusStop;
  busStopId: number;
  order: number;
};

export type BusStop = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

export type Departure = {
  id: number;
  hour: string;
  minute: number;
  busRouteId: number;
  busRoute: BusRoute;
  busId: number;
  bus?: Bus;
  busStopId: number;
  busStop?: BusStop;
};

export type BusRoute = {
  id: number;
  busRouteDirectionId: number;
  busRouteDirection?: BusRouteDirection;
  dayOfWeek: number;
  routeInfo?: number[];
};
