using System;
using Core.Models;

namespace QuestionService
{
    public interface IQuestionService
    {
        Question GetQuestion();

        bool CheckAnswer(Question question, string answer);
    }
}
