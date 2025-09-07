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
                    "  question: string,\n" +
                    "  options: MultipleChoiceOption[],\n" +
                    "  correctAnswer: MultipleChoiceOption\n" +
                    "}\n" +
                    "MultipleChoiceOption = {\n" +
                    "  id: string, // e.g., 'A', 'B', 'C', 'D'\n" +
                    "  text: string\n" +
                    "}\n" +
                    "Rules:\n" +
                    "1. Always provide exactly 4 options per question.\n" +
                    "2. Correct answer must match one of the options.\n" +
                    "3. Output only valid JSON, no extra commentary."
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
                    "You are a trivia generator. " +
                    "Always return JSON strictly matching this schema:\n" +
                    "MultipleChoiceQuestionSet = {\n" +
                    "  questions: MultipleChoiceQuestion[]\n" +
                    "}\n" +
                    "MultipleChoiceQuestion = {\n" +
                    "  question: string,\n" +
                    "  options: MultipleChoiceOption[],\n" +
                    "  correctAnswer: MultipleChoiceOption\n" +
                    "}\n" +
                    "MultipleChoiceOption = {\n" +
                    "  id: string, // e.g., 'A', 'B', 'C', 'D'\n" +
                    "  text: string\n" +
                    "}\n" +
                    "Rules:\n" +
                    "1. Always provide exactly 4 options per question.\n" +
                    "2. Correct answer must match one of the options.\n" +
                    "3. Output only valid JSON, no extra commentary.\n" +
                    "4. This is an opinion-based question, craft a fun or imaginative question where the 'correct' answer is AI-generated but still plausible."
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
