using Core.QuestionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using QuestionService.Handlers;

namespace Apis.QuestionAPI
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly QuestionHandler _handler;

        public QuestionController()
        {
            _handler = new QuestionHandler(); // inject later for real DI
        }

        [HttpGet]
        public ActionResult<IEnumerable<Question>> GetAll()
        {
            return Ok(_handler.ListQuestions());
        }

        [HttpGet("{id}")]
        public ActionResult<Question> Get(Guid id)
        {
            var question = _handler.GetQuestion(id);
            if (question == null)
                return NotFound();

            return Ok(question);
        }
    }
}
