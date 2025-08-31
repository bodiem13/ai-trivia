namespace QuestionAPI.Models {

    @doc("A trivia question.")
    model Question {
    @format("uuid")
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    }
}