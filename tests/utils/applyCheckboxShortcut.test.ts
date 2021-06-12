import { applyCheckboxShortcut } from '../../src/utils';

it(`Should work for shiftKey=true, ctrlKey=false, altKey=false`, () => {
  const finalItems = applyCheckboxShortcut(
    {
      target: { checked: true },
      nativeEvent: {
        altKey: false,
        ctrlKey: false,
        shiftKey: true
      }
    } as any,
    ['MCQ', 'MS', 'FIB', 'Snippet'],
    ['Snippet'],
    1
  );
  expect(finalItems).toStrictEqual(['MCQ', 'MS', 'Snippet']);
});

it(`Should work for shiftKey=true, ctrlKey=true, altKey=false`, () => {
  const finalItems = applyCheckboxShortcut(
    {
      target: { checked: true },
      nativeEvent: {
        altKey: false,
        ctrlKey: true,
        shiftKey: true
      }
    } as any,
    ['MCQ', 'MS', 'FIB', 'Snippet'],
    ['Snippet'],
    1
  );
  expect(finalItems).toStrictEqual(['MCQ', 'MS']);
});

it(`Should work for shiftKey=true, ctrlKey=false, altKey=true`, () => {
  const finalItems = applyCheckboxShortcut(
    {
      target: { checked: true },
      nativeEvent: {
        altKey: true,
        ctrlKey: false,
        shiftKey: true
      }
    } as any,
    ['MCQ', 'MS', 'FIB', 'Snippet'],
    ['MCQ'],
    1
  );
  expect(finalItems).toStrictEqual(['FIB', 'Snippet', 'MCQ']);
});

it(`Should work for shiftKey=true, ctrlKey=true, altKey=true`, () => {
  const finalItems = applyCheckboxShortcut(
    {
      target: { checked: true },
      nativeEvent: {
        altKey: true,
        ctrlKey: true,
        shiftKey: true
      }
    } as any,
    ['MCQ', 'MS', 'FIB', 'Snippet'],
    [],
    1
  );
  expect(finalItems).toStrictEqual(['FIB', 'Snippet']);
});

it(`Should work for shiftKey=false, ctrlKey=false, altKey=true, checked = false`, () => {
  const finalItems = applyCheckboxShortcut(
    {
      target: { checked: false },
      nativeEvent: {
        altKey: true,
        ctrlKey: false,
        shiftKey: false
      }
    } as any,
    ['MCQ', 'MS', 'FIB', 'Snippet'],
    ['MS'],
    1
  );
  expect(finalItems).toStrictEqual(['MCQ', 'FIB', 'Snippet']);
});

it(`Should work for shiftKey=false, ctrlKey=false, altKey=true, checked = true`, () => {
  const finalItems = applyCheckboxShortcut(
    {
      target: { checked: true },
      nativeEvent: {
        altKey: true,
        ctrlKey: false,
        shiftKey: false
      }
    } as any,
    ['MCQ', 'MS', 'FIB', 'Snippet'],
    ['MCQ', 'FIB', 'Snippet'],
    1
  );
  expect(finalItems).toStrictEqual(['MS']);
});

it(`Should work for shiftKey=false, ctrlKey=false, altKey=false, checked = true`, () => {
  const finalItems = applyCheckboxShortcut(
    {
      target: { checked: true },
      nativeEvent: {
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      }
    } as any,
    ['MCQ', 'MS', 'FIB', 'Snippet'],
    ['MCQ', 'Snippet'],
    1
  );
  expect(finalItems).toStrictEqual(['MCQ', 'Snippet', 'MS']);
});

it(`Should work for shiftKey=false, ctrlKey=false, altKey=false, checked = false`, () => {
  const finalItems = applyCheckboxShortcut(
    {
      target: { checked: false },
      nativeEvent: {
        altKey: false,
        ctrlKey: false,
        shiftKey: false
      }
    } as any,
    ['MCQ', 'MS', 'FIB', 'Snippet'],
    ['MCQ', 'MS', 'Snippet'],
    1
  );
  expect(finalItems).toStrictEqual(['MCQ', 'Snippet']);
});
