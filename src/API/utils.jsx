import { API_URL, START_DATE, TODAY, TIME_INTERVAL } from './const';
/*
export const getData = (date) => {
  fetch(`${API_URL}${date}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}; */
export const formatDate = (date) => date.toISOString().split('T')[0];

export const getData = async (setData) => {
  const date = START_DATE;
  try {
    const response = await fetch(`${API_URL}${formatDate(date)}`);
    if (response.status === 200) {
      const myJson = await response.json();
      setData(myJson);
    } else {
      console.log('not a 200');
    }
  } catch (err) {
    console.log(err);
  } finally {
    date.setDate(date.getDate() + 1);
    if (date < TODAY) {
      setTimeout(() => getData(formatDate(START_DATE)), TIME_INTERVAL);
    }
  }
};
