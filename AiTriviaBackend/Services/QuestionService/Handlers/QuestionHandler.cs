using Core.QuestionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace QuestionService.Handlers
{
    public class QuestionHandler : IQuestionHandler
    {
        private readonly IQuestionGenerator _questionGenerator;
        private readonly string _mockCategory;
        private readonly string _mockDifficulty;
        private readonly int _mockQuestionCount;
        private readonly int _mockOpinionQuestionCount;

        public QuestionHandler(IQuestionGenerator questionGenerator)
        {
            _questionGenerator = questionGenerator;
            _mockCategory = "Sports";
            _mockDifficulty = "Easy";
            _mockQuestionCount = 3;
            _mockOpinionQuestionCount = 1;
        }

        public async Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync()
        {
            // TODO add category generator
            var standardQuestions = await _questionGenerator.GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType.Standard, _mockCategory, _mockDifficulty, _mockQuestionCount);
            var opinionQuestion = await _questionGenerator.GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType.Opinion, _mockCategory, _mockDifficulty, _mockOpinionQuestionCount);

            return new MultipleChoiceQuestionSet
            {
                Questions = standardQuestions.Questions.Concat(opinionQuestion.Questions).ToList()
            };
        }
    }
}
