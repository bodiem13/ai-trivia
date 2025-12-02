using Core.QuestionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuestionService;
using QuestionService.Handlers;

namespace Apis.QuestionAPI
{
    [ApiController]
    [Route("api/questions")]
    [AllowAnonymous]
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
        public async Task<ActionResult<MultipleChoiceQuestionSet>> GetQuestion(
            [FromQuery] string? difficulty,
            [FromQuery] string? category)
        {
            try
            {
                if (Environment.GetEnvironmentVariable("USE_MOCK") == "true")
                {
                    return Ok(new
                    {
                        question = "What planet is known as the Red Planet?",
                        choices = new[] { "Earth", "Mars", "Jupiter", "Venus" },
                        answer = "Mars"
                    });
                }

                var question = await _aiQuestionService.GetOrGenerateTodayQuestionAsync();
                if (question == null)
                    return NotFound(new { success = false, error = "No question generated" });

                return Ok(question);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, error = ex.Message });
            }
        }

        [HttpGet("health-check")]
        public async Task<IActionResult> HealthCheck()
        {
            return Ok(new
            {
                success = true,
                environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"),
                serverTimeUtc = DateTime.UtcNow,
                message = "✅ API is alive and returning mock data",
                sampleQuestion = new
                {
                    question = "What planet is known as the Red Planet?",
                    choices = new[] { "Earth", "Mars", "Jupiter", "Venus" },
                    answer = "Mars"
                }
            });
        }
    }
}
