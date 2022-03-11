const createTripPoint = (pointData) => {
  const createIconLink = () => `img/icons/${pointData.event.toLowerCase()}.png`;
  const createFavorites = () => {
    let activeClass = '';
    if (pointData.favorite) {
      activeClass = 'event__favorite-btn--active';
    }
    return `<button class="event__favorite-btn ${activeClass}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`;
  };
  const addSelectedOffers = () => {
    const offers = pointData.offers;
    return offers.reduce((acc, offer) => {
      acc += offer.checked ?
        `<li class="event__offer">
  <span class="event__offer-title">${offer.name}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>`:
        '';
      return acc;
    }, '');
  };
  const generateDuration = () => {
    const duration =  pointData.pointDuration;
    const durDay = duration.get('days');
    const durHour = duration.get('hours');
    const durMin = duration.get('minutes');
    if (durDay) {
      return `${durDay} D ${durHour} H ${durMin} M`;
    } else if (durHour) {
      return `${durHour} H ${durMin} M`;
    } else {
      return `${durMin} M`;
    }
  };

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${pointData.date.format('YYYY-MM-DD')}">${pointData.date.format('MMM D')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${createIconLink()}" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointData.event} ${pointData.city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${pointData.date.format('YYYY-MM-DDTHH:MM')}">${pointData.date.format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${pointData.toTime.format('YYYY-MM-DDTHH:MM')}">${pointData.toTime.format('HH:mm')}</time>
        </p>
        <p class="event__duration">${generateDuration()}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${pointData.price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${addSelectedOffers()}
      </ul>
      ${createFavorites()}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

const createTripList = () => `
<ul class="trip-events__list"></ul>`;

export {createTripList, createTripPoint};
