import React, { useEffect, useState, createContext } from 'react';

import { API_URL, START_DATE, TODAY, TIME_INTERVAL } from '../API/const';
import { formatDate } from '../API/utils';

const RateContext = createContext(null);

const RateProvider = ({ children }) => {
  const [data, setData] = useState(new Map());

  useEffect(() => {
    const date = START_DATE;
    if (date > TODAY) {
      return;
    }
    const id = setTimeout(() => {
      async function subscribe() {
        const response = await fetch(`${API_URL}${formatDate(date)}`);
        if (response.status === 502) {
          await subscribe();
        } else if (!response.ok) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          await subscribe();
        } else {
          const message = await response.json();
          setData(() => new Map(data.set(formatDate(date), message)));
          date.setDate(date.getDate() + 1);
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
