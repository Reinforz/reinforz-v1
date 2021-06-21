import { generateMenuStyles } from '../../src/utils';

it(`Should work correctly for position=right, isOpen=false`, () => {
  const {
    containerStyle,
    left,
    iconStyle,
    iconsContainerStyle
  } = generateMenuStyles('right', false, 500);

  expect(containerStyle).toStrictEqual({
    width: `100%`,
    left: `0px`,
    position: 'relative',
    transition: 'width 250ms ease-in-out, left 250ms ease-in-out'
  });
  expect(iconStyle).toStrictEqual({
    transform: 'rotate(-180deg)'
  });
  expect(left).toStrictEqual(`calc(100% + 5px)`);
  expect(iconsContainerStyle).toStrictEqual({
    left: -50
  });
});

it(`Should work correctly for position=right, isOpen=true`, () => {
  const {
    containerStyle,
    left,
    iconStyle,
    iconsContainerStyle
  } = generateMenuStyles('right', true, 500);

  expect(containerStyle).toStrictEqual({
    width: `calc(100% - 500px)`,
    left: `0px`,
    position: 'relative',
    transition: 'width 250ms ease-in-out, left 250ms ease-in-out'
  });
  expect(iconStyle).toStrictEqual({
    transform: 'rotate(0deg)'
  });
  expect(left).toStrictEqual(`calc(100% - 10px)`);
  expect(iconsContainerStyle).toStrictEqual({
    left: -35
  });
});

it(`Should work correctly for position=left, isOpen=true`, () => {
  const {
    containerStyle,
    left,
    iconStyle,
    iconsContainerStyle
  } = generateMenuStyles('left', true, 500);

  expect(containerStyle).toStrictEqual({
    width: `calc(100% - 500px)`,
    left: `500px`,
    position: 'relative',
    transition: 'width 250ms ease-in-out, left 250ms ease-in-out'
  });
  expect(iconStyle).toStrictEqual({
    transform: 'rotate(-180deg)'
  });
  expect(left).toStrictEqual(`-500px`);
  expect(iconsContainerStyle).toStrictEqual({
    left: '100%'
  });
});

it(`Should work correctly for position=left, isOpen=false`, () => {
  const {
    containerStyle,
    left,
    iconStyle,
    iconsContainerStyle
  } = generateMenuStyles('left', false, 500);

  expect(containerStyle).toStrictEqual({
    width: `100%`,
    left: `0px`,
    position: 'relative',
    transition: 'width 250ms ease-in-out, left 250ms ease-in-out'
  });
  expect(iconStyle).toStrictEqual({
    transform: 'rotate(0deg)'
  });
  expect(left).toStrictEqual(`-510px`);
  expect(iconsContainerStyle).toStrictEqual({
    left: 'calc(100% + 10px)'
  });
});
