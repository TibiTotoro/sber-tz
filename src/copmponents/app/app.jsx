import React from 'react';

import { RateContext } from '../../context/rateContext';

import styles from './app.module.scss';

export const App = () => {
  const data = React.useContext(RateContext);
  console.log(data);
  return (
    <div className={styles.main}>
      <h1>Заголовок и все такое</h1>
    </div>
  );
};
