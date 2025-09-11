import { FC } from "react";
import QuestionCard from "./QuestionCard";
import { Models_MultipleChoiceQuestionSet } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestionSet";

interface Props {
  questions: Models_MultipleChoiceQuestionSet;
}

const QuestionList: FC<Props> = ({ questions }) => {
  return (
    <div>
      {questions.questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  );
};

export default QuestionList;
