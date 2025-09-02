namespace QuestionAPI.Models {

    @doc("A trivia question.")
    model Question {
    @format("uuid")
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    }

    @doc("Multiple choice option")
    model MultipleChoiceOption {
    id: string;       // Unique identifier, e.g. "A", "B", "C", "D"
    text: string;     // The text of the option
    }

    @doc("Multiple choice question")
    model MultipleChoiceQuestion {
    question: string;                 // The trivia question
    options: MultipleChoiceOption[];  // All possible options
    correctAnswer: MultipleChoiceOption; // Explicitly mark the correct answer
    }

    @doc("Multiple choice question set")
    model MultipleChoiceQuestionSet {
    questions: MultipleChoiceQuestion[]; // Support multiple questions in one response
    }
}