using Core.QuestionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionService.Handlers
{
    public class QuestionHandler
    {
        private readonly List<Question> _mockQuestions;

        public QuestionHandler()
        {
            // Initialize mock data
            _mockQuestions = new List<Question>
            {
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is 2 + 2?",
                    Options = new List<string> { "3", "4", "5" },
                    CorrectAnswer = "4"
                },
                new Question
                {
                    Id = Guid.NewGuid(),
                    Text = "What is the capital of France?",
                    Options = new List<string> { "Paris", "London", "Berlin" },
                    CorrectAnswer = "Paris"
                }
            };
        }

        public IEnumerable<Question> ListQuestions() => _mockQuestions;

        public Question GetQuestion(Guid id) =>
            _mockQuestions.FirstOrDefault(q => q.Id == id);
    }
}
