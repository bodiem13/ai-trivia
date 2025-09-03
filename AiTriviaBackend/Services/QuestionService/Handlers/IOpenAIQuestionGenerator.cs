using Core.QuestionAPI.Models;

namespace QuestionService.Handlers
{
    public interface IOpenAIQuestionGenerator
    {
        Task<Question> GenerateQuestionAsync(string topic, string difficulty);
    }
}
