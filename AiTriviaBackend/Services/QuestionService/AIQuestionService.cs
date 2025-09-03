using Core.QuestionAPI.Models;
using QuestionService.Handlers;

namespace QuestionService;

public class AIQuestionService
{
    private readonly IQuestionHandler _questionHandler;
    public Question GetQuestion(string topic, string difficulty)
    {
        return _questionHandler.LoadMultipleChoiceQuestionAsync(topic, difficulty).Result;
    }
}
