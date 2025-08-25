export const groupByHours = (json) => {
  let groupedContent = Object.values(
    json.reduce((acc, item) => {
      if (!acc[item.hour])
        acc[item.hour] = {
          hour: item.hour,
          departures: [],
        };
      let obj = {
        minute: item.minute,
        busRouteId: item.busRouteId,
        dayOfWeek: item.busRoute.dayOfWeek,
        routeInfo: item.busRoute.routeInfo,
      };
      acc[item.hour].departures.push(obj);
      return acc;
    }, {})
  );
  return groupedContent;
};

export const groupByDayOfWeek = (data) => {
  const acc = Array.from({ length: 3 }, () => []);
  return data.reduce((acc, item) => {
    // Group departures by dayOfWeek
    const departuresByDay = item.departures.reduce((dayAcc, dep) => {
      const day = dep.dayOfWeek;
      if (!dayAcc[day]) {
        dayAcc[day] = [];
      }
      // Create a copy without dayOfWeek
      const { dayOfWeek, ...rest } = dep;
      dayAcc[day].push(rest);
      return dayAcc;
    }, {});

    // For each day, create a new item and add to acc
    Object.keys(departuresByDay).forEach((day) => {
      const newItem = {
        hour: item.hour,
        departures: departuresByDay[day],
      };
      acc[day].push(newItem);
    });

    return acc;
  }, acc);
};

// export const groupByInfo = (json) => {
//   let groupedContent = Object.values(
//     json.reduce((acc, item) => {
//       if (!acc[item.busRoute.routeInfo])
//         acc[item.busRoute.routeInfo] = {
//           busInfo: item.busRoute.routeInfo,
//         };
//       let routeInfo = item.busRoute.routeInfo;
//       acc[item.busRoute.routeInfo].departure.push(routeInfo);
//       return acc;
//     }, {})
//   );
//   return groupedContent;
// };
