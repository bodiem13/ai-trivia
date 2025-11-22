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

export function getRank(score: number, totalQuestions: number, difficulty: Models_MultipleChoiceQuestionDifficulty) {
  const maxPoints = totalQuestions * getPointsForDifficulty(difficulty);
  const percent = (score / maxPoints) * 100;

  if (percent === 100) return "🏆 Trivia Master";
  if (percent >= 85) return "🔥 Elite Thinker";
  if (percent >= 65) return "🎯 Sharp Mind";
  if (percent >= 40) return "🧠 Getting There";
  return "🙂 Keep Practicing";
}

