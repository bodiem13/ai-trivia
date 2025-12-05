using OpenAI.Chat;

namespace QuestionService.Helpers
{
    public class OpenAIChatMessageHelper : IOpenAIChatMessageHelper
    {
        public List<ChatMessage> BuildStandardMultipleChoiceQuestionChatMessage(string category, string difficulty, int questionCount)
        {
            if (questionCount <= 0)
                throw new ArgumentOutOfRangeException(nameof(questionCount));

            var systemPrompt =
            "You are a strict JSON generator for a C# trivia application.\n\n" +
            "Return ONLY valid JSON in this exact shape:\n\n" +
            "{\"questions\":[{\"id\":\"uuid\",\"question\":\"text\",\"options\":[{\"id\":\"A\",\"text\":\"...\"},{\"id\":\"B\",\"text\":\"...\"},{\"id\":\"C\",\"text\":\"...\"},{\"id\":\"D\",\"text\":\"...\"}],\"correctAnswer\":{\"id\":\"A\",\"text\":\"...\"},\"type\":\"Standard\"}]}\n\n" +
            $"Rules:\n" +
            $"- Generate exactly {questionCount} questions\n" +
            "- Exactly 4 options: A, B, C, D\n" +
            "- correctAnswer must match one option exactly\n" +
            "- id must be UUID v4\n" +
            "- type = \"Standard\"\n" +
            "- No extra fields, no markdown, no comments, no prose\n" +
            "- No null values";

            var userPrompt =
            $"Category: {category}\n" +
            $"Difficulty: {difficulty}\n\n" +
            $"Generate exactly {questionCount} standard multiple-choice trivia questions now.";

            return new List<ChatMessage>
            {
                ChatMessage.CreateSystemMessage(systemPrompt),
                ChatMessage.CreateUserMessage(userPrompt)
            };
        }


        public List<ChatMessage> BuildOpinionMultipleChoiceQuestionChatMessage(string category, string difficulty, int questionCount)
        {
            var systemPrompt =
            "You are a strict JSON generator for a C# trivia application.\n\n" +
            "Return ONLY valid JSON in this exact shape:\n\n" +
            "{\"questions\":[{\"id\":\"uuid\",\"question\":\"text\",\"options\":[{\"id\":\"A\",\"text\":\"...\"},{\"id\":\"B\",\"text\":\"...\"},{\"id\":\"C\",\"text\":\"...\"},{\"id\":\"D\",\"text\":\"...\"}],\"correctAnswer\":{\"id\":\"A\",\"text\":\"...\"},\"type\":\"Opinion\"}]}\n\n" +
            $"Rules:\n" +
            $"- Generate exactly {questionCount} questions\n" +
            "- Questions must start with \"According to AI,\"" +
            "- Exactly 4 options: A, B, C, D\n" +
            "- correctAnswer must match one option exactly\n" +
            "- id must be UUID v4\n" +
            "- type = \"Opinion\"\n" +
            "- No commentary, no markdown, no extra fields\n" +
            "- No null values";

            var userPrompt =
            $"Generate exactly {questionCount} opinion-based multiple choice questions.\n\n" +
            $"Category: {category}\n" +
            $"Difficulty: {difficulty}\n\n" +
            "Each question must:\n" +
            "- Be subjective / opinion-based\n" +
            "- Have ONE best answer selected as correctAnswer\n" +
            "- Be reasonable for a general audience\n" +
            "- Avoid ambiguity, satire, or nonsense";


            return new List<ChatMessage>
            {
                ChatMessage.CreateSystemMessage(systemPrompt),
                ChatMessage.CreateUserMessage(userPrompt)
            };
        }

    }
}
