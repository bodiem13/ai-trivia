using Core.QuestionAPI.Models;

namespace QuestionService.Handlers
{
    public class QuestionHandler : IQuestionHandler
    {
        private readonly IOpenAIQuestionGenerator _openAIQuestionGenerator;
        private readonly string _mockCategory;
        private readonly string _mockDifficulty;
        private readonly int _mockQuestionCount;
        private readonly int _mockOpinionQuestionCount;

        public QuestionHandler(IOpenAIQuestionGenerator openAIQuestionGenerator)
        {
            _openAIQuestionGenerator = openAIQuestionGenerator;
            _mockCategory = "Sports";
            _mockDifficulty = "Easy";
            _mockQuestionCount = 3;
            _mockOpinionQuestionCount = 1;
        }

        public async Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync()
        {
            // TODO add category generator
            var standardQuestions = await _openAIQuestionGenerator.GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType.Standard, _mockCategory, _mockDifficulty, _mockQuestionCount);
            var opinionQuestion = await _openAIQuestionGenerator.GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType.Opinion, _mockCategory, _mockDifficulty, _mockOpinionQuestionCount);

            return new MultipleChoiceQuestionSet
            {
                Questions = standardQuestions.Questions.Concat(opinionQuestion.Questions).ToList()
            };
        }
    }
}
