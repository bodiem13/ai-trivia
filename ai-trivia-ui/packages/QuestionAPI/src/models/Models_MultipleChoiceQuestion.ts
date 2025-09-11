/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Models_MultipleChoiceOption } from './Models_MultipleChoiceOption';
import type { Models_MultipleChoiceQuestionType } from './Models_MultipleChoiceQuestionType';
/**
 * Multiple choice question
 */
export type Models_MultipleChoiceQuestion = {
    id: string;
    question: string;
    options: Array<Models_MultipleChoiceOption>;
    correctAnswer: Models_MultipleChoiceOption;
    type: Models_MultipleChoiceQuestionType;
};

