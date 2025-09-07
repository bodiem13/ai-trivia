using Core.QuestionAPI.Models;

namespace QuestionService
{
    public interface IAIQuestionService
    {
        MultipleChoiceQuestion GetQuestion();

        bool CheckAnswer(MultipleChoiceQuestion question, string answer);

        Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync();
    }
}
