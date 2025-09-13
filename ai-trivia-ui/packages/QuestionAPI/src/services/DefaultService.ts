/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Models_MultipleChoiceQuestion } from '../models/Models_MultipleChoiceQuestion';
import type { Models_MultipleChoiceQuestionSet } from '../models/Models_MultipleChoiceQuestionSet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Get all questions
     * @returns Models_MultipleChoiceQuestionSet The request has succeeded.
     * @throws ApiError
     */
    public static listMultipleChoiceQuestions(): CancelablePromise<Models_MultipleChoiceQuestionSet> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/questions',
        });
    }
    /**
     * Get a question by its ID
     * @returns Models_MultipleChoiceQuestion The request has succeeded.
     * @throws ApiError
     */
    public static getMultipleChoiceQuestion({
        id,
    }: {
        id: number,
    }): CancelablePromise<Models_MultipleChoiceQuestion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/questions/{id}',
            path: {
                'id': id,
            },
        });
    }
}
