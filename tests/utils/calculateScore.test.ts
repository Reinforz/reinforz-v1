import { calculateScore } from '../../src/utils';

const options = {
  weight: 1,
  hints_used: 0,
  time_taken: 14,
  time_allocated: 60,
  totalHints: 3,
  timerDisabled: false
} as const;

describe('partial_score=true', () => {
  const options1 = {
    ...options,
    partial_score: true
  };

  describe('verdict=true', () => {
    const options2 = {
      ...options1,
      verdict: true
    };

    it(`Should work for all correct answers`, () => {
      const score = calculateScore({
        ...options2,
        totalAnswers: 1,
        totalCorrectAnswers: 1
      });

      expect(score).toStrictEqual({
        amount: 1,
        answers: 0.7,
        hints: 0.15,
        time: 0.15
      });
    });

    it(`Should work when all hints are used`, () => {
      const score = calculateScore({
        ...options2,
        hints_used: 3,
        totalAnswers: 1,
        totalCorrectAnswers: 1
      });

      expect(score).toStrictEqual({
        amount: 0.887,
        answers: 0.7,
        hints: 0.037,
        time: 0.15
      });
    });

    it(`Should work when some hints are used`, () => {
      const score = calculateScore({
        ...options2,
        hints_used: 1,
        totalAnswers: 1,
        totalCorrectAnswers: 1
      });

      expect(score).toStrictEqual({
        amount: 0.962,
        answers: 0.7,
        hints: 0.112,
        time: 0.15
      });
    });

    it(`Should work when full time allocated is used`, () => {
      const score = calculateScore({
        ...options2,
        time_taken: 59,
        totalAnswers: 1,
        totalCorrectAnswers: 1
      });

      expect(score).toStrictEqual({
        amount: 0.887,
        answers: 0.7,
        hints: 0.15,
        time: 0.037
      });
    });

    it(`Should work when timerDisabled=true is used`, () => {
      const score = calculateScore({
        ...options2,
        time_taken: 0,
        totalAnswers: 1,
        totalCorrectAnswers: 1,
        timerDisabled: true
      });

      expect(score).toStrictEqual({
        amount: 1,
        answers: 0.85,
        hints: 0.15,
        time: 0
      });
    });
  });

  describe('verdict=false', () => {
    const options2 = {
      ...options1,
      verdict: false
    };

    it(`Should work for partial correct answers`, () => {
      const score = calculateScore({
        ...options2,
        totalAnswers: 2,
        totalCorrectAnswers: 1
      });

      expect(score).toStrictEqual({
        amount: 0.65,
        answers: 0.35,
        hints: 0.15,
        time: 0.15
      });
    });
  });
});

describe('partial_score=false', () => {
  const options1 = {
    ...options,
    partial_score: false
  };

  describe('verdict=true', () => {
    const options2 = {
      ...options1,
      verdict: true
    };

    it(`Should work for all correct answers`, () => {
      const score = calculateScore({
        ...options2,
        totalAnswers: 1,
        totalCorrectAnswers: 1
      });

      expect(score).toStrictEqual({
        amount: 1,
        answers: 0.7,
        hints: 0.15,
        time: 0.15
      });
    });
  });

  describe('verdict=false', () => {
    const options2 = {
      ...options1,
      verdict: false
    };

    it(`Should work for partial correct answers`, () => {
      const score = calculateScore({
        ...options2,
        totalAnswers: 2,
        totalCorrectAnswers: 1
      });

      expect(score).toStrictEqual({
        amount: 0,
        answers: 0.35,
        hints: 0.15,
        time: 0.15
      });
    });
  });
});
