using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QuestionService;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TriviaController : ControllerBase
    {
        private readonly IQuestionService _questionService;

        public TriviaController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        // GET api/trivia/question
        [HttpGet("question")]
        public ActionResult<Question> GetQuestion()
        {
            var question = _questionService.GetQuestion();
            return Ok(question);
        }

        // POST api/trivia/answer
        [HttpPost("answer")]
        public ActionResult<object> CheckAnswer([FromBody] AnswerRequest request)
        {
            var question = _questionService.GetQuestion(); // Using stub for demo
            var correct = _questionService.CheckAnswer(question, request.Answer);

            return Ok(new { correct });
        }

        public class AnswerRequest
        {
            public string Answer { get; set; } = string.Empty;
        }
    }
}
