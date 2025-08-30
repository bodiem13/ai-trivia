import "@typespec/http";
import "./models.tsp";

using Http;
using QuestionAPI.Models;

@service(#{ title: "QuestionAPI" })
@route("/questions")
namespace QuestionAPI {
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