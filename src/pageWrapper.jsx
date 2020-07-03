import React from 'react';
import 'core-js/stable';

import { RateProvider } from './context/rateContext';

export const PageWrapper = ({ children }) => {
  return (
    <RateProvider>
      <div>{children}</div>
    </RateProvider>
  );
};
