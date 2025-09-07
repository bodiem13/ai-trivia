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
        private readonly IQuestionHandler _questionHandler;

        public QuestionController(IQuestionHandler questionHandler)
        {
            _questionHandler = questionHandler;
        }

        [HttpGet]
        public ActionResult<Question> GetQuestion()
        {
            var question = _questionHandler.LoadMultipleChoiceQuestionAsync("science", "easy").Result;
            return question;
        }
    }
}
