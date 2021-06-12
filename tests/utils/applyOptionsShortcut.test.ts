import { applyOptionsShortcut } from '../../src/utils';

describe('Pressed digit code', () => {
  describe('digit pressed is within option range', () => {
    describe('type is mcq', () => {
      it(`Should call setUserAnswers`, () => {
        const setUserAnswers = jest.fn();
        applyOptionsShortcut(
          {
            nativeEvent: {
              code: 'Digit1'
            }
          } as any,
          'MCQ',
          3,
          ['0'],
          setUserAnswers
        );
        expect(setUserAnswers).toHaveBeenCalledWith(['0']);
      });
    });

    describe('type is MS', () => {
      describe('Option is checked', () => {
        it(`Should call setUserAnswers`, () => {
          const setUserAnswers = jest.fn();
          applyOptionsShortcut(
            {
              nativeEvent: {
                code: 'Digit1'
              }
            } as any,
            'MS',
            3,
            ['0'],
            setUserAnswers
          );
          expect(setUserAnswers).toHaveBeenCalledWith([]);
        });
      });

      describe('Option is not checked', () => {
        it(`Should call setUserAnswers`, () => {
          const setUserAnswers = jest.fn();
          applyOptionsShortcut(
            {
              nativeEvent: {
                code: 'Digit1'
              }
            } as any,
            'MS',
            3,
            [],
            setUserAnswers
          );
          expect(setUserAnswers).toHaveBeenCalledWith(['0']);
        });
      });
    });

    describe('Type is not mcq or ms', () => {
      it(`should not call setUserAnswers`, () => {
        const setUserAnswers = jest.fn();
        applyOptionsShortcut(
          {
            nativeEvent: {
              code: 'Digit1'
            }
          } as any,
          'FIB',
          3,
          ['0'],
          setUserAnswers
        );
        expect(setUserAnswers).not.toHaveBeenCalled();
      });
    });
  });

  describe('digit pressed is not within option range', () => {
    it(`should not call setUserAnswers`, () => {
      const setUserAnswers = jest.fn();
      applyOptionsShortcut(
        {
          nativeEvent: {
            code: 'Digit6'
          }
        } as any,
        'MCQ',
        3,
        ['0'],
        setUserAnswers
      );
      expect(setUserAnswers).not.toHaveBeenCalled();
    });
  });
});

describe(`Didn't press digit code`, () => {
  it(`should not call setUserAnswers`, () => {
    const setUserAnswers = jest.fn();
    applyOptionsShortcut(
      {
        nativeEvent: {
          code: 'KeyA'
        }
      } as any,
      'MCQ',
      3,
      ['0'],
      setUserAnswers
    );
    expect(setUserAnswers).not.toHaveBeenCalled();
  });
});
