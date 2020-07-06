import React, { useEffect, useRef, useState } from 'react';

import * as d3 from 'd3';

import { RateContext } from '~context/rateContext';
import { CURRENCIES } from '~src/const';
import { PERIOD } from '~src/API/const';
import { formatCurrency } from '~src/utils';
import { AxisX } from './chartAxisX';
import { AxisY } from './chartAxisY';
import { ChartLine } from './chartLine';

import styles from './chart.module.scss';

export const Chart = () => {
  const svgRef = useRef();

  const [width, setWidth] = useState(260);
  const height = 300;

  useEffect(() => {
    setWidth(svgRef.current.parentElement.offsetWidth);
  }, []);

  const data = React.useContext(RateContext);

  const renderData = [];
  CURRENCIES.map((item) => {
    const arr = [];
    [...data.keys()].map((k) => {
      const obj = {};
      obj.x = data.get(k).x;
      obj.y = formatCurrency(data.get(k).rates[item]);
      arr.push(obj);
    });
    renderData.push(arr);
  });

  const xScale = d3
    .scaleLinear()
    .domain([0, PERIOD + 1])
    .range([0, width]);

  const yScale = d3.scaleLinear().range([height, 0]);
  const yMin = renderData.reduce((pv, cv) => {
    // eslint-disable-next-line no-shadow
    const currentMin = cv.reduce((pv, cv) => Math.min(pv, cv.y), 90);
    return Math.min(pv, currentMin);
  }, 100);
  const yMax = renderData.reduce((pv, cv) => {
    // eslint-disable-next-line no-shadow
    const currentMax = cv.reduce((pv, cv) => Math.max(pv, cv.y), 50);
    return Math.max(pv, currentMax);
  }, 0);
  renderData[0].length === 0 ? yScale.domain([60, 90]) : yScale.domain([yMin - 10, yMax + 10]);

  return (
    <div className={styles.wrapper}>
      <h2>Курс валют - график</h2>
      <svg ref={svgRef} className={styles.svg} width={width} height={height}>
        <AxisY scale={yScale} data={renderData} />
        <AxisX width={width} height={height} />
        <ChartLine renderData={renderData} xScale={xScale} yScale={yScale} />
      </svg>
    </div>
  );
};
