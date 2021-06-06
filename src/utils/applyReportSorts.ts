import { IReportSort, IResult } from '../types';

type TComparison = 'equal' | 'greater' | 'lesser';

function returnSort(comparison: TComparison, order: 'ASC' | 'DESC') {
  if (comparison === 'greater') {
    if (order === 'DESC') {
      return -1;
    } else {
      return 1;
    }
  } else if (comparison === 'lesser') {
    if (order === 'ASC') {
      return -1;
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

function getNumberComparison(number1: number, number2: number): TComparison {
  if (number1 > number2) return 'greater';
  else if (number1 < number2) return 'lesser';
  else return 'equal';
}

function getBooleanComparison(bool1: boolean, bool2: boolean): TComparison {
  if (bool1 === true && bool2 === false) return 'greater';
  else if (bool1 === false && bool2 === true) return 'lesser';
  else return 'equal';
}

function getStringComparison(str1: string, str2: string): TComparison {
  if (str1 > str2) return 'greater';
  else if (str1 < str2) return 'lesser';
  else return 'equal';
}

export function applyReportSorts(results: IResult[], reportSorts: IReportSort) {
  return results.sort((resultA, resultB) => {
    let res = 0;
    for (let index = 0; index < reportSorts.length; index++) {
      const [category, order] = reportSorts[index];
      let comparison: TComparison = 'equal';
      switch (category) {
        case 'Score': {
          comparison = getNumberComparison(
            resultA.score.amount,
            resultB.score.amount
          );
          break;
        }
        case 'Time Taken': {
          comparison = getNumberComparison(
            resultA.time_taken,
            resultB.time_taken
          );
          break;
        }
        case 'Hints Used': {
          comparison = getNumberComparison(
            resultA.hints_used,
            resultB.hints_used
          );
          break;
        }
        case 'Weight': {
          comparison = getNumberComparison(
            resultA.question.weight,
            resultB.question.weight
          );
          break;
        }
        case 'Time Allocated': {
          comparison = getNumberComparison(
            resultA.question.time_allocated,
            resultB.question.time_allocated
          );
          break;
        }
        case 'Verdict': {
          comparison = getBooleanComparison(resultA.verdict, resultB.verdict);
          break;
        }
        case 'Type': {
          comparison = getStringComparison(
            resultA.question.type,
            resultB.question.type
          );
          break;
        }
        case 'Difficulty': {
          comparison = getStringComparison(
            resultA.question.difficulty,
            resultB.question.difficulty
          );
          break;
        }
      }
      res = returnSort(comparison, order);
      if (res !== 0) {
        break;
      }
    }
    return res;
  });
}
