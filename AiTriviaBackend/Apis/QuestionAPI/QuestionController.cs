using Core.QuestionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using QuestionService;
using QuestionService.Handlers;

namespace Apis.QuestionAPI
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly IAIQuestionService _aiQuestionService;

        public QuestionController(IAIQuestionService aiQuestionService)
        {
            _aiQuestionService = aiQuestionService;
        }

        [HttpGet]
        public ActionResult<MultipleChoiceQuestionSet> GetQuestion()
        {
            var question = _aiQuestionService.GetOrGenerateTodayQuestionAsync().Result;
            return question;
        }
    }
}
