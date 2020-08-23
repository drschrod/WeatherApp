import { formatHourlyTime, getHourAndAmOrPm } from '../../../src/helpers/time';

function timeRange(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

describe('getHourAndAmOrPm', () => {
  const hours = timeRange(1, 11);
  test.each(hours)('Generates correct string for index: %i', (h) => {
    const time = getHourAndAmOrPm(12, h);
    expect(time).toMatchObject({ amOrPm: 'PM', hour: (12 + h) % 12 });
  });
  test.each(hours)('Generates correct string for index: %i', (h) => {
    const time = getHourAndAmOrPm(0, h);
    expect(time).toMatchObject({ amOrPm: 'AM', hour: (12 + h) % 12 });
  });
});

describe('formatHourlyTime', () => {
  const hours = timeRange(1, 11);
  test.each(hours)('Generates correct string for index: %i', (h) => {
    const time = formatHourlyTime(12, h);
    expect(time).toBe(`${(12 + h) % 12} PM`);
  });
  test.each(hours)('Generates correct string for index: %i', (h) => {
    const time = formatHourlyTime(0, h);
    expect(time).toBe(`${(12 + h) % 12} AM`);
  });
});
