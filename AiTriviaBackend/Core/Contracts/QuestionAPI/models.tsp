namespace QuestionAPI.Models {
    @doc("Multiple choice option")
    model MultipleChoiceOption {
    id: string;       // Unique identifier, e.g. "A", "B", "C", "D"
    text: string;     // The text of the option
    }

    @doc("Multiple choice question")
    model MultipleChoiceQuestion {
    @format("uuid")
    id: string;
    question: string;                 // The trivia question
    options: MultipleChoiceOption[];  // All possible options
    correctAnswer: MultipleChoiceOption; // Explicitly mark the correct answer
    type: MultipleChoiceQuestionType;    
    }

    @doc("Multiple choice question set")
    model MultipleChoiceQuestionSet {
    questions: MultipleChoiceQuestion[]; // Support multiple questions in one response
    }

    @doc("Question type for multiple choice questions")
    enum MultipleChoiceQuestionType {
    standard: "Standard",
    opinion: "Opinion"
    }

    @doc("Difficulty for trivia questions")
    enum MultipleChoiceQuestionDifficulty {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard"
    }
}