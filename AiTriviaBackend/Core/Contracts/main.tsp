import "@typespec/http";

@service(#{ title: "Main" })
@tag("Main")
namespace QuestionApi;

model Question {
  id: int32;
  text: string;
  options: string[];
  correctAnswer: string;
}

@doc("Get a question by its ID")
@route("/questions/{id}")
op getQuestion(@path id: string): Question;