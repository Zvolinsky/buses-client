export const groupByHours = (json) => {
  let groupedContent = Object.values(
    json.reduce((acc, item) => {
      if (!acc[item.hour])
        acc[item.hour] = {
          hour: item.hour,
          departure: [],
        };
      let obj = {
        minute: item.minute,
        busRouteId: item.busRouteId,
        dayOfWeek: item.busRoute.dayOfWeek,
        routeInfo: item.busRoute.routeInfo,
      };
      acc[item.hour].departure.push(obj);
      return acc;
    }, {})
  );
  return groupedContent;
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
