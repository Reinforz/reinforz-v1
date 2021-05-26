import { displayTime } from '../../src/utils';

it(`Should work for positive times`, () => {
  expect(displayTime(120)).toStrictEqual(`02:00`);
});

it(`Should work for positive times`, () => {
  expect(displayTime(150)).toStrictEqual(`02:30`);
});

it(`Should work for negative times`, () => {
  expect(displayTime(-120)).toStrictEqual(`-02:00`);
});
