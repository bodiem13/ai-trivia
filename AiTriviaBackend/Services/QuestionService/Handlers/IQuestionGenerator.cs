using Core.QuestionAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionService.Handlers
{
    public interface IQuestionGenerator
    {
        Task<MultipleChoiceQuestionSet> GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType questionType, string topic, string difficulty, int questionCount);
    }
}
