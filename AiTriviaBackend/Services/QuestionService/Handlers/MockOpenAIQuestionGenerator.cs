using Core.QuestionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionService.Handlers
{
    public class MockOpenAIQuestionGenerator : IOpenAIQuestionGenerator
    {
        public MockOpenAIQuestionGenerator() { }
        public Task<MultipleChoiceQuestionSet> GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType questionType, string topic, string difficulty, int questionCount)
        {
            var questions = new List<MultipleChoiceQuestion>
            {
                new MultipleChoiceQuestion
                {
                    Id = Guid.NewGuid(),
                    Question = $"Sample standard question for {topic} ({difficulty})",
                    Type = MultipleChoiceQuestionType.Standard,
                    Options = new List<MultipleChoiceOption>
                    {
                        new MultipleChoiceOption { Id = "A", Text = "Option 1" },
                        new MultipleChoiceOption { Id = "B", Text = "Option 2" },
                        new MultipleChoiceOption { Id = "C", Text = "Option 3" },
                        new MultipleChoiceOption { Id = "D", Text = "Option 4" }
                    },
                    CorrectAnswer = new MultipleChoiceOption { Id = "A", Text = "Option 1" }
                },
                new MultipleChoiceQuestion
                {
                    Id = Guid.NewGuid(),
                    Question = $"Sample opinion question for {topic}",
                    Type = MultipleChoiceQuestionType.Opinion,
                    Options = new List<MultipleChoiceOption>
                    {
                        new MultipleChoiceOption { Id = "A", Text = "Option 1" },
                        new MultipleChoiceOption { Id = "B", Text = "Option 2" },
                        new MultipleChoiceOption { Id = "C", Text = "Option 3" },
                        new MultipleChoiceOption { Id = "D", Text = "Option 4" }
                    },
                    CorrectAnswer = new MultipleChoiceOption { Id = "B", Text = "Option 2" }
                }
            };

            return Task.FromResult(new MultipleChoiceQuestionSet { Questions = questions });
        }
    }
}
