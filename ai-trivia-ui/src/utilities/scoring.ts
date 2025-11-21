import { Models_MultipleChoiceQuestionDifficulty } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionDifficulty";

export const getPointsForDifficulty = (difficulty: Models_MultipleChoiceQuestionDifficulty): number => {
  switch (difficulty) {
    case Models_MultipleChoiceQuestionDifficulty.EASY:
      return 1;
    case Models_MultipleChoiceQuestionDifficulty.MEDIUM:
      return 2;
    case Models_MultipleChoiceQuestionDifficulty.HARD:
      return 4;
    default:
      return 0;
  }
};
