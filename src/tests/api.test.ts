import { baseURL, entities } from "../services/api";

const request = require("supertest");

const API_URL = baseURL;

describe("GET api/Buses", () => {
  test("get-all-buses", async () => {
    const response = await request(API_URL).get(
      `${entities.buses}get-all-buses`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    //Sprawdzam, czy odpowiedź zawiera tablicę autobusów
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Sprawdzam strukturę losowego elementu
    const bus = response.body[0];
    expect(bus).toHaveProperty("id");
    expect(bus).toHaveProperty("number");
  });

  test("get-bus-by-id", async () => {
    const response = await request(API_URL).get(
      `${entities.buses}get-bus-by-id/1`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    // Sprawdzam strukturę elementu
    const bus = response.body;
    expect(bus).toHaveProperty("id");
    expect(bus).toHaveProperty("number");
  });
});

describe("GET api/BusRouteDirections", () => {
  test("get-all-bus-route-directions", async () => {
    const response = await request(API_URL).get(
      `${entities.busRouteDirections}get-all-bus-route-directions`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    //Sprawdzam, czy odpowiedź zawiera tablicę elementów
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Sprawdzam strukturę losowego elementu
    const busRouteDirection = response.body[0];
    expect(busRouteDirection).toHaveProperty("id");
    expect(busRouteDirection).toHaveProperty("name");
    expect(busRouteDirection).toHaveProperty("busId");
    expect(busRouteDirection).toHaveProperty("bus");
  });

  test("get-bus-route-direction-by-busid", async () => {
    const response = await request(API_URL).get(
      `${entities.busRouteDirections}get-bus-route-direction-by-busid/1`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    //Sprawdzam, czy odpowiedź zawiera tablicę elementów
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Sprawdzam strukturę elementu
    const busRouteDirection = response.body[0];
    expect(busRouteDirection).toHaveProperty("id");
    expect(busRouteDirection).toHaveProperty("name");
    expect(busRouteDirection).toHaveProperty("busId");
    expect(busRouteDirection).toHaveProperty("bus");
  });
});

describe("GET api/BusRoutes", () => {
  test("get-bus-routes", async () => {
    const response = await request(API_URL).get(`api/BusRoutes/get-bus-routes`);
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    //Sprawdzam, czy odpowiedź zawiera tablicę elementów
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Sprawdzam strukturę losowego elementu
    const busRoute = response.body[0];
    expect(busRoute).toHaveProperty("id");
    expect(busRoute).toHaveProperty("busRouteDirectionId");
    expect(busRoute).toHaveProperty("busRouteDirection");
    expect(busRoute).toHaveProperty("dayOfWeek");
    expect(busRoute).toHaveProperty("routeInfo");
  });

  test("get-bus-route-by-id", async () => {
    const response = await request(API_URL).get(
      `api/BusRoutes/get-bus-route-by-id/44`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    // Sprawdzam strukturę elementu
    const busRoute = response.body;
    expect(busRoute).toHaveProperty("id");
    expect(busRoute).toHaveProperty("busRouteDirectionId");
    expect(busRoute).toHaveProperty("busRouteDirection");
    expect(busRoute).toHaveProperty("dayOfWeek");
    expect(busRoute).toHaveProperty("routeInfo");
  });
});

describe("GET api/BusRouteStops", () => {
  test("get-bus-route-stops", async () => {
    const response = await request(API_URL).get(
      `${entities.busRouteStops}get-bus-route-stops?busRouteDirectionId=1`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    //Sprawdzam, czy odpowiedź zawiera tablicę elementów
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Sprawdzam strukturę losowego elementu
    const busRouteStop = response.body[0];
    expect(busRouteStop).toHaveProperty("id");
    expect(busRouteStop).toHaveProperty("busStopId");
    expect(busRouteStop).toHaveProperty("busStop");
    expect(busRouteStop).toHaveProperty("busRouteDirectionId");
    expect(busRouteStop).toHaveProperty("busRouteDirection");
    expect(busRouteStop).toHaveProperty("order");
  });
});

describe("GET api/BusStops", () => {
  test("get-all-bus-stops", async () => {
    const response = await request(API_URL).get(
      `${entities.busStops}get-all-bus-stops`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    //Sprawdzam, czy odpowiedź zawiera tablicę elementów
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Sprawdzam strukturę losowego elementu
    const busStop = response.body[0];
    expect(busStop).toHaveProperty("id");
    expect(busStop).toHaveProperty("name");
    expect(busStop).toHaveProperty("latitude");
    expect(busStop).toHaveProperty("longitude");
  });
  test("get-bus-stop-by-id", async () => {
    const response = await request(API_URL).get(
      `${entities.busStops}get-bus-stop-by-id/1`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    // Sprawdzam strukturę elementu
    const busStop = response.body;
    expect(busStop).toHaveProperty("id");
    expect(busStop).toHaveProperty("name");
    expect(busStop).toHaveProperty("latitude");
    expect(busStop).toHaveProperty("longitude");
  });
});

describe("GET api/Departures", () => {
  test("get-departures", async () => {
    const response = await request(API_URL).get(
      `${entities.departures}get-departures`
    );
    // Sprawdzam status odpowiedzi
    expect(response.statusCode).toBe(200);

    //Sprawdzam, czy odpowiedź zawiera tablicę elementów
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    // Sprawdzam strukturę losowego elementu
    const departure = response.body[0];
    expect(departure).toHaveProperty("id");
    expect(departure).toHaveProperty("hour");
    expect(departure).toHaveProperty("minute");
    expect(departure).toHaveProperty("busRouteId");
    expect(departure).toHaveProperty("busRoute");
    expect(departure).toHaveProperty("busId");
    expect(departure).toHaveProperty("bus");
    expect(departure).toHaveProperty("busStopId");
    expect(departure).toHaveProperty("busStop");
  });
});
