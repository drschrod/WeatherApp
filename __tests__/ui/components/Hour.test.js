/**
 * @format
 */

import { render, cleanup } from '@testing-library/react-native';

import 'react-native';

import React from 'react';

import { Hour } from '../../../src/components';

function timeRange(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

describe.each(timeRange(1, 11))('shortForecast Variations', (h) => {
  const hours = timeRange(1, 11);
  afterEach(cleanup);
  it(`renders expected time for hour "${h + 0}"`, () => {
    const { getByText, debug } = render(
      <Hour currentHour={0} fontSize={50} index={h} />,
    );
    getByText('AM');
    getByText(`${(12 + h) % 12}`);
  });

  it(`renders expected time for hour "${h + 12}"`, () => {
    const { getByText, debug } = render(
      <Hour currentHour={12} fontSize={50} index={h} />,
    );
    getByText('PM');
    getByText(`${(12 + h) % 12}`);
  });
});
