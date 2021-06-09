import { generateNavigationStyles } from '../../src/utils';

it(`Should work for x=center, y=center`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'center',
    y: 'center'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  });
});

it(`Should work for x=left, y=center`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'left',
    y: 'center'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    left: '0px',
    top: '50%',
    transform: 'translateY(-50%)'
  });
});

it(`Should work for x=right, y=center`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'right',
    y: 'center'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    right: '0px',
    top: '50%',
    transform: 'translateY(-50%)'
  });
});

it(`Should work for x=center, y=top`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'center',
    y: 'top'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    left: '50%',
    top: '0px',
    transform: 'translateX(-50%)'
  });
});

it(`Should work for x=left, y=top`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'left',
    y: 'top'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    left: '0px',
    top: '0px'
  });
});

it(`Should work for x=right, y=top`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'right',
    y: 'top'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    right: '0px',
    top: '0px'
  });
});

it(`Should work for x=center, y=bottom`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'center',
    y: 'bottom'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    left: '50%',
    bottom: '0px',
    transform: 'translateX(-50%)'
  });
});

it(`Should work for x=left, y=bottom`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'left',
    y: 'bottom'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    left: '0px',
    bottom: '0px'
  });
});

it(`Should work for x=right, y=bottom`, () => {
  const generatedNavigationStyles = generateNavigationStyles({
    x: 'right',
    y: 'bottom'
  });

  expect(generatedNavigationStyles).toStrictEqual({
    right: '0px',
    bottom: '0px'
  });
});
