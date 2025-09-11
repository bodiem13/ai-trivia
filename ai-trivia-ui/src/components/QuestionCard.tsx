import { FC } from "react";
import { Models_MultipleChoiceQuestion } from "../../packages/QuestionAPI/src/models/Models_MultipleChoiceQuestion";

interface Props {
  question: Models_MultipleChoiceQuestion;
}

const QuestionCard: FC<Props> = ({ question }) => {
  return (
    <div className="border p-4 rounded-md mb-4">
      <p className="font-semibold">{question.question}</p>
      <ul className="list-disc ml-5">
        {question.options.map((opt) => (
          <li key={opt.id}>{opt.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
