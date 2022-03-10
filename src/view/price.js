const createSitePrice = (pointData) => {
  const totalPrice = pointData.reduce((acc, curVal) => {
    acc += curVal.price;
    return acc;
  }, 0);
  return`<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>
`;};

export {createSitePrice};
