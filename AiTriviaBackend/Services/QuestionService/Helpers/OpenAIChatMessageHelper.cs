using OpenAI.Chat;

namespace QuestionService.Helpers
{
    public class OpenAIChatMessageHelper : IOpenAIChatMessageHelper
    {
        public List<ChatMessage> BuildStandardMultipleChoiceQuestionChatMessage(string category, string difficulty, int questionCount)
        {
            var messages = new List<ChatMessage>
            {
                ChatMessage.CreateSystemMessage(
                    "You are a trivia generator. " +
                    "Always return JSON strictly matching this schema:\n" +
                    "MultipleChoiceQuestionSet = {\n" +
                    "  questions: MultipleChoiceQuestion[]\n" +
                    "}\n" +
                    "MultipleChoiceQuestion = {\n" +
                    "  id: string (uuid),\n" +
                    "  question: string,\n" +
                    "  options: MultipleChoiceOption[],\n" +
                    "  correctAnswer: MultipleChoiceOption,\n" +
                    "  type: 'Standard'\n" +
                    "}\n" +
                    "MultipleChoiceOption = {\n" +
                    "  id: string, // e.g., 'A', 'B', 'C', 'D'\n" +
                    "  text: string\n" +
                    "}\n" +
                    "Rules:\n" +
                    "1. Always provide exactly 4 options per question.\n" +
                    "2. Correct answer must exactly match one of the provided options.\n" +
                    "3. Use a valid UUID for each question's id.\n" +
                    "4. Set type to 'Standard'.\n" +
                    "5. Output only valid JSON, no extra commentary."
                ),
                ChatMessage.CreateUserMessage($"Generate a {category} trivia question with difficulty {difficulty}.")
            };
            return messages;
        }

        public List<ChatMessage> BuildOpinionMultipleChoiceQuestionChatMessage(string category, string difficulty, int questionCount)
        {
            var messages = new List<ChatMessage>
            {
                ChatMessage.CreateSystemMessage(
                    "You are a trivia generator for AI-opinion-based questions. " +
                    "Always return JSON strictly matching this schema:\n" +
                    "MultipleChoiceQuestionSet = {\n" +
                    "  questions: MultipleChoiceQuestion[]\n" +
                    "}\n" +
                    "MultipleChoiceQuestion = {\n" +
                    "  id: string (uuid),\n" +
                    "  question: string,\n" +
                    "  options: MultipleChoiceOption[],\n" +
                    "  correctAnswer: MultipleChoiceOption,\n" +
                    "  type: 'Opinion'\n" +
                    "}\n" +
                    "MultipleChoiceOption = {\n" +
                    "  id: string, // e.g., 'A', 'B', 'C', 'D'\n" +
                    "  text: string\n" +
                    "}\n" +
                    "Rules:\n" +
                    "1. Always provide exactly 4 options per question.\n" +
                    "2. The correctAnswer must reflect the option the AI believes is the best or most likely answer (it is subjective).\n" +
                    "3. Use a valid UUID for each question's id.\n" +
                    "4. Set type to 'Opinion'.\n" +
                    "5. Output only valid JSON, no extra commentary."
                ),
                ChatMessage.CreateUserMessage(
                    $"Generate an opinion-based {category} trivia question. " +
                    $"Example style: 'Which actor AI thinks would survive longest in a zombie apocalypse?' " +
                    $"Difficulty: {difficulty}."
                )
            };
            return messages;
        }
    }
}
