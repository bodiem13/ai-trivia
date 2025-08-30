namespace QuestionAPI.Models {

    @doc("A trivia question.")
    model Question {
    id: int32;
    text: string;
    options: string[];
    correctAnswer: string;
    }
}