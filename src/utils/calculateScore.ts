import { IResult } from "../types";

interface Parameter {
  weight: number;
  time_taken: number;
  hints_used: number;
  partial_score: boolean;
  verdict: boolean;
  totalHints: number;
  time_allocated: number;
  totalAnswers: number;
  totalCorrectAnswers: number;
}

export function calculateScore(parameter: Parameter): IResult["score"] {
  const {
    weight,
    time_taken,
    hints_used,
    partial_score,
    verdict,
    totalHints,
    time_allocated,
    totalAnswers,
    totalCorrectAnswers
  } = parameter;
  const correctAnswersScore = 0.7 * (totalCorrectAnswers / totalAnswers);
  const hintsScore = (0.15 / (totalHints + 1)) * (totalHints + 1 - hints_used);
  const totalTimeDivisions = Math.ceil(time_allocated / 15),
    timeDivisions = Math.floor(time_taken / 15);
  const timeTakenScore =
    (0.15 / totalTimeDivisions) * (totalTimeDivisions - timeDivisions);
  const score =
    weight *
    (partial_score
      ? Number(
          (correctAnswersScore + hintsScore + timeTakenScore).toFixed(2)
        )
      : verdict
      ? 1
      : 0);

  return {
    amount: score,
    answers: correctAnswersScore,
    hints: hintsScore,
    time: timeTakenScore
  };
}
