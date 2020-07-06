import React from 'react';
import { Chart } from '~components/chart/chart';
import { Table } from '~components/table/table';

import styles from './app.module.scss';

export const App = () => {
  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h1>Заголовок и все такое</h1>
        <div className={styles.content}>
          <Chart />
          <Table />
        </div>
      </div>
    </div>
  );
};
