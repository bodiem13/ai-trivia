using Core.QuestionAPI.Models;

namespace QuestionService
{
    public interface IAIQuestionService
    {
        Question GetQuestion();

        bool CheckAnswer(Question question, string answer);
    }
}
