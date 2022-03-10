const createSiteTripInfo = (pointData) => {
  const createRoute = () => {
    const routeFrom = pointData[0].city;
    const routeTo = pointData[pointData.length-1].city;
    const generateMidRoutePoint = () => {
      if (pointData.length === 2) {
        return '';
      } else if (pointData.length === 3) {
        return `${pointData[1].city} &mdash;`;
      } else {
        return '... &mdash;';
      }
    };
    return `${routeFrom} &mdash; ${generateMidRoutePoint()} ${routeTo}`;

  };
  const fromDate = pointData[0].date.format('MMM DD');
  const toDate = pointData[pointData.length-1].date.format('MMM DD');
  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${createRoute()}</h1>
  
      <p class="trip-info__dates">${fromDate}&nbsp;&mdash;&nbsp;${toDate}</p>
    </div>
  </section>`;
};


export { createSiteTripInfo };
