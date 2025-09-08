using Core.QuestionAPI.Models;

namespace QuestionService.Handlers
{
    public interface IOpenAIQuestionGenerator
    {
        Task<MultipleChoiceQuestionSet> GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType questionType, string topic, string difficulty, int questionCount);
    }
}
