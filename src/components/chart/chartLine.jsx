import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { select } from 'd3';

export const ChartLine = ({ renderData, xScale, yScale }) => {
  const lineRef = useRef();
  const line = d3
    .line()
    .x((d) => xScale(d.x))
    .y((d) => yScale(d.y))
    .curve(d3.curveMonotoneX);

  useEffect(() => {
    const svgLine = select(lineRef.current);
    const lines = svgLine.selectAll('.line').data(renderData).attr('class', 'line');

    lines.exit().remove();

    // enter any new data
    lines
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('d', line)
      .style('stroke', () => '#' + Math.floor(Math.random()*0.5 * 16777215).toString(16))
      .style('stroke-width', '1.5')
      // Update new data
      .merge(lines)
      .transition()
      .duration(1500)
      .attr('d', line);
  }, [renderData]);

  return <g ref={lineRef} className='lines' />;
};
