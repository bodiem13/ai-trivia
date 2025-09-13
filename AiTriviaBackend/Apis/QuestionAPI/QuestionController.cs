using Core.QuestionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using QuestionService;
using QuestionService.Handlers;

namespace Apis.QuestionAPI
{
    [ApiController]
    [Route("api/questions")]
    public class QuestionController : ControllerBase
    {
        private readonly IAIQuestionService _aiQuestionService;
        private readonly IOpenAIQuestionGenerator _openAIQuestionGenerator;

        public QuestionController(IAIQuestionService aiQuestionService, IOpenAIQuestionGenerator openAIQuestionGenerator)
        {
            _aiQuestionService = aiQuestionService;
            _openAIQuestionGenerator = openAIQuestionGenerator;
        }

        [HttpGet]
        public ActionResult<MultipleChoiceQuestionSet> GetQuestion()
        {
            var question = _aiQuestionService.GetOrGenerateTodayQuestionAsync().Result;
            return question;
        }

        [HttpGet("health-check")]
        public async Task<IActionResult> HealthCheck()
        {
            try
            {
                var completion = await _openAIQuestionGenerator.GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType.Standard, "science", "easy", 1);
                return Ok(new { success = true, question = completion });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }
    }
}
