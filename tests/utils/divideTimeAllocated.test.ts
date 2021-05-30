import { divideTimeAllocated } from '../../src/utils';

[15, 30, 45, 60, 90, 120].forEach((timeAllocated) => {
  it(`Should give ${timeAllocated} if time_allocated < ${timeAllocated}`, () => {
    expect(divideTimeAllocated(timeAllocated - 1)).toStrictEqual(
      timeAllocated.toString()
    );
  });

  it(`Should give ${timeAllocated} if time_allocated = ${timeAllocated}`, () => {
    expect(divideTimeAllocated(timeAllocated)).toStrictEqual(
      timeAllocated.toString()
    );
  });
});

it(`Should throw error if time_allocated > 120`, () => {
  expect(() => divideTimeAllocated(130)).toThrow();
});
