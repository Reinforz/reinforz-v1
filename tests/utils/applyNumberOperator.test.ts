import { applyNumberOperator } from '../../src/utils';

it(`Should work for ! operator`, () => {
  expect(applyNumberOperator(['!', [10]], 11)).toBe(true);
});

it(`Should work for < operator`, () => {
  expect(applyNumberOperator(['<', [10]], 5)).toBe(true);
});

it(`Should work for > operator`, () => {
  expect(applyNumberOperator(['>', [10]], 15)).toBe(true);
});

it(`Should work for <= operator`, () => {
  expect(applyNumberOperator(['<=', [10]], 10)).toBe(true);
});

it(`Should work for >= operator`, () => {
  expect(applyNumberOperator(['>=', [10]], 10)).toBe(true);
});

it(`Should work for <> operator`, () => {
  expect(applyNumberOperator(['<>', [10, 20]], 15)).toBe(true);
});

it(`Should work for >< operator`, () => {
  expect(applyNumberOperator(['><', [10, 20]], 5)).toBe(true);
});

it(`Should work for = operator`, () => {
  expect(applyNumberOperator(['=', [10]], 10)).toBe(true);
});
