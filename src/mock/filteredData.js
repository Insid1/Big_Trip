import dayjs from 'dayjs';

export const getFilteredData = (data, filterName) => {
  const today = dayjs();
  const filteredData = {
    everything: data,
    future: [],
    past: [],
  };
  filteredData.future = data.filter((pointData) => (pointData.fromTime >= today || pointData.toTime >= today));
  filteredData.past = data.filter((pointData) => pointData.fromTime < today && pointData.toTime < today);
  return filterName ? filteredData[filterName] : filteredData;
};
