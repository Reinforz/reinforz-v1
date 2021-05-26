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

export function calculateScore(parameter: Parameter) {
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
  const correct_answers_score = 0.7 * (totalCorrectAnswers / totalAnswers);
  const hints_score = (0.15 / (totalHints + 1)) * (totalHints + 1 - hints_used);
  const totalTimeDivisions = Math.ceil(time_allocated / 15),
    timeDivisions = Math.floor(time_taken / 15);
  const time_taken_score =
    (0.15 / totalTimeDivisions) * (totalTimeDivisions - timeDivisions);
  const score =
    weight *
    (partial_score
      ? Number(
          (correct_answers_score + hints_score + time_taken_score).toFixed(2)
        )
      : verdict
      ? 1
      : 0);

  return score;
}
