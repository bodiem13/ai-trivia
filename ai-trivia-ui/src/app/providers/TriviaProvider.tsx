"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Models_MultipleChoiceQuestionSet } from "../../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionSet"; // your generated types

interface TriviaContextType {
  questions: Models_MultipleChoiceQuestionSet | null;
  setQuestions: (questions: Models_MultipleChoiceQuestionSet) => void;
}

const TriviaContext = createContext<TriviaContextType | undefined>(undefined);

export const TriviaProvider = ({ children }: { children: ReactNode }) => {
  const [questions, setQuestions] = useState<Models_MultipleChoiceQuestionSet | null>(null);

  return (
    <TriviaContext.Provider value={{ questions, setQuestions }}>
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
