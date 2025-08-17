using System;
using System.Collections.Generic;
using Core.Models;

namespace QuestionService
{
    public class QuestionService: IQuestionService
    {
        public Question GetQuestion()
        {
            return new Question
            {
                Text = "What is the capital of France?",
                Options = new List<string> { "Paris", "Berlin", "Rome", "Madrid" },
                CorrectAnswer = "Paris"
            };
        }

        public bool CheckAnswer(Question question, string answer)
        {
            return question.CorrectAnswer.Equals(answer, StringComparison.OrdinalIgnoreCase);
        }
    }
}
