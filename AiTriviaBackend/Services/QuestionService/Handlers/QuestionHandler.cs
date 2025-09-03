using Core.QuestionAPI.Models;

namespace QuestionService.Handlers
{
    public class QuestionHandler : IQuestionHandler
    {
        private readonly IOpenAIQuestionGenerator _openAIQuestionGenerator;

        public QuestionHandler(IOpenAIQuestionGenerator openAIQuestionGenerator)
        {
            _openAIQuestionGenerator = openAIQuestionGenerator;
        }
        public async Task<Question> LoadMultipleChoiceQuestionAsync(string topic, string difficulty)
        {
            var question = await _openAIQuestionGenerator.GenerateQuestionAsync(topic, difficulty);
            return question;
        }
    }
}
