import { Models_MultipleChoiceQuestionDifficulty as Difficulty } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionDifficulty";


export interface DifficultyUIConfig {
  difficulty: Difficulty;
  displayName: string;
  points: number;
  color: string;
  description: string;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyUIConfig> = {
  Easy: {
    difficulty: Difficulty.EASY,
    displayName: "Easy",
    points: 1,
    color: "green",
    description: "Best for casual play"
  },
  Medium: {
    difficulty: Difficulty.MEDIUM,
    displayName: "Medium",
    points: 2,
    color: "orange",
    description: "Balanced challenge"
  },
  Hard: {
    difficulty: Difficulty.HARD,
    displayName: "Hard",
    points: 4,
    color: "red",
    description: "High risk, high reward"
  }
};
