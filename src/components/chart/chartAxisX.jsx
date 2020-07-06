import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { select, axisBottom } from 'd3';
import { TODAY, START_DATE } from '~src/API/const';

export const AxisX = ({ width, height }) => {
  const gRef = useRef();

  useEffect(() => {
    const svgG = select(gRef.current);
    const xScale = d3.scaleUtc().domain([START_DATE, TODAY]).nice().range([0, width]);
    const xAxis = axisBottom(xScale)
      .ticks(4)
      .tickSize(-height)
      .tickFormat(d3.timeFormat('%Y-%m-%d'));
    svgG
      .call(xAxis)
      .attr('transform', `translate(0,${height})`)
      .call((g) =>
        g.selectAll('.tick line').attr('stroke-opacity', 0.5).attr('stroke-dasharray', '1,2')
      )
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    svgG.selectAll('.domain').attr('stroke', 'none');
  }, [width]);

  return <g ref={gRef} className='x-axis' />;
};
