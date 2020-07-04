import React from 'react';
import classNames from 'classnames';
import { RateContext } from '~context/rateContext';
import { CURRENCIES } from '~src/const';
import { formatCurrency } from '~src/utils';

import styles from './table.module.scss';

export const Table = () => {
  const data = React.useContext(RateContext);

  return (
    <div>
      <h2>Курс валют - таблица</h2>
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={classNames(styles.col, styles.col_header)}>Дата</div>
          {CURRENCIES.map((item) => (
            <div key={item} className={classNames(styles.col, styles.col_header)}>
              {item}
            </div>
          ))}
        </div>
        {[...data.keys()].map((k) => (
          <div key={k} className={styles.row}>
            <div className={styles.col}>{k}</div>
            {CURRENCIES.map((item) => (
              <div key={item} className={styles.col}>
                {formatCurrency(data.get(k).rates[item])}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
