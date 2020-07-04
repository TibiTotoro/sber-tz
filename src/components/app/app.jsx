import React from 'react';
import { Table } from '~components/table/table';

import styles from './app.module.scss';

export const App = () => {
  return (
    <div className={styles.main}>
      <h1>Заголовок и все такое</h1>
      <Table />
    </div>
  );
};
