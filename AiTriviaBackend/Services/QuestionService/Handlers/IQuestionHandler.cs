using Core.QuestionAPI.Models;

namespace QuestionService.Handlers
{
    public interface IQuestionHandler
    {
        Task<Question> LoadMultipleChoiceQuestionAsync(string topic, string difficulty);
    }
}
