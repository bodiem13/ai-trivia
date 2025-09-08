using Core.QuestionAPI.Models;

namespace QuestionService.Handlers
{
    public interface IQuestionHandler
    {
        Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync();
    }
}
