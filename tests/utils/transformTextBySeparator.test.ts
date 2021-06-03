import { transformTextBySeparator } from '../../src/utils';

it(`Should work with default separator and join`, () => {
  expect(transformTextBySeparator('hello_world')).toStrictEqual('Hello World');
});

it(`Should work with custom separator and join`, () => {
  expect(transformTextBySeparator('hello world', ' ', '-')).toStrictEqual(
    'Hello-World'
  );
});
