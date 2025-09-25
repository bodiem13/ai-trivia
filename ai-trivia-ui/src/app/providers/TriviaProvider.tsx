"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Models_MultipleChoiceQuestionSet } from "../../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionSet"; // your generated types
import { Models_MultipleChoiceQuestionDifficulty } from "../../../packages/QuestionAPI/src";

interface TriviaContextType {
  questions: Models_MultipleChoiceQuestionSet | null;
  setQuestions: (questions: Models_MultipleChoiceQuestionSet) => void;
  setDifficulty: (questions: Models_MultipleChoiceQuestionDifficulty) => void;
  difficulty: Models_MultipleChoiceQuestionDifficulty | null;
}

const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

export const TriviaProvider = ({ children }: { children: ReactNode }) => {
  const [difficulty, setDifficulty] = useState<Models_MultipleChoiceQuestionDifficulty | null>(null);
  const [questions, setQuestions] = useState<Models_MultipleChoiceQuestionSet | null>(null);

  return (
    <TriviaContext.Provider value={{ questions, setQuestions, difficulty, setDifficulty }}>
      {children}
    </TriviaContext.Provider>
  );
};

// Custom hook for consuming trivia context
export const useTrivia = () => {
  const context = useContext(TriviaContext);
  if (!context) {
    throw new Error("useTrivia must be used within a TriviaProvider");
  }
  return context;
};
