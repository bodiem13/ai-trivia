using Core.QuestionAPI.Models;

namespace QuestionService
{
    public interface IAIQuestionService
    {
        Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync();

        bool CheckAnswer(MultipleChoiceQuestion question, string answer);
    }
}
