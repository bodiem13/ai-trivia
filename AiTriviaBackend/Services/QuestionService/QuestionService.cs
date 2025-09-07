using Core.QuestionAPI.Models;
using QuestionService.Handlers;

namespace QuestionService;

public class QuestionService
{
    private readonly IQuestionHandler _questionHandler;
    public QuestionService(IQuestionHandler questionHandler)
    {
        _questionHandler = questionHandler;
    }

    public async Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync()
    {
        return await _questionHandler.GetOrGenerateTodayQuestionAsync();
    }

    public bool CheckAnswer(MultipleChoiceQuestion question, string answer)
    {
        return question.CorrectAnswer.Text.Equals(answer, StringComparison.OrdinalIgnoreCase);
    }
}
