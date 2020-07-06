import React, { useRef, useEffect } from 'react';
import { select, axisLeft } from 'd3';

export const AxisY = ({ scale, data }) => {
  const gRef = useRef();
  const yScale = scale;

  useEffect(() => {
    const svgG = select(gRef.current);
    const yAxis = axisLeft().scale(yScale);

    if (svgG.empty()) {
      svgG.append('g').attr('class', 'y axis').call(yAxis);
    } else {
      svgG.transition().duration(1500).call(yAxis);
    }
  }, [data]);

  return <g ref={gRef} className='y-axis' />;
};
