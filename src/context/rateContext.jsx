import React, { useEffect, useState, createContext } from 'react';

import { API_URL, START_DATE, TODAY, TIME_INTERVAL, BASE_CUR } from '~src/API/const';
import { formatDate } from '~src/utils';

const RateContext = createContext(null);

const RateProvider = ({ children }) => {
  const [data, setData] = useState(new Map());
  const [chartX, setChartX] = useState(0);

  useEffect(() => {
    const date = START_DATE;

    if (date > TODAY) {
      return;
    }

    const id = setTimeout(() => {
      async function subscribe() {
        const response = await fetch(`${API_URL}${formatDate(date)}?base=${BASE_CUR}`);
        if (response.status === 502) {
          await subscribe();
        } else if (!response.ok) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await subscribe();
        } else {
          const message = await response.json();
          const dateCopy = new Date(date);
          message.date = dateCopy;
          setChartX(chartX + 1);
          message.x = chartX;
          date.setDate(date.getDate() + 1);
          setData(() => new Map(data.set(formatDate(date), message)));         
        }
      }
      subscribe();
      return () => {
        clearTimeout(id);
      };
    }, TIME_INTERVAL);
  }, [data]);

  return <RateContext.Provider value={data}>{children}</RateContext.Provider>;
};

export { RateContext, RateProvider };
