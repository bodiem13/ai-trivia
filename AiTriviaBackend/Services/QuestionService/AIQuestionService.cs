using Core.QuestionAPI.Models;
using QuestionService.Handlers;

namespace QuestionService
{
    public class AIQuestionService : IAIQuestionService
    {
        private readonly IQuestionHandler _questionHandler;

        public AIQuestionService(
            IQuestionHandler questionHandler)
        {
            _questionHandler = questionHandler;
        }

        public async Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync(int questionCount = 5, string category = "General", string difficulty = "Easy")
        {
            return await _questionHandler.GetOrGenerateTodayQuestionAsync(questionCount, category, difficulty);
        }
    }
}
