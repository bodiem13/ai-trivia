import "@typespec/http";
import "./models.tsp";

using Http;
using API.QuestionAPI.Models;

@route("/questions")
namespace API.QuestionAPI.Routes {
    /**
     * List all questions
     */
    @get
    @doc("Get all questions")
    op listQuestions(): Question[];

    /**
     * Get one question by ID
     */
    @doc("Get a question by its ID")
    op getQuestion(@path id: int32): Question;
}