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
        private readonly IQuestionService _questionService;

        public QuestionController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet("today")]
        public async Task<ActionResult<MultipleChoiceQuestionSet>> GetTodayQuestions()
        {
            var questions = await _questionService.GetOrGenerateTodayQuestionAsync().ConfigureAwait(false);
            return Ok(questions);
        }
    }
}
