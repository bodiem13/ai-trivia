using Core.QuestionAPI.Models;

namespace QuestionService
{
    public interface IAIQuestionService
    {
        /// <summary>
        /// Retrieves today's question set from storage, or generates a new one if none exists.
        /// </summary>
        Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync(int questionCount, string category, string difficulty);
    }
}
