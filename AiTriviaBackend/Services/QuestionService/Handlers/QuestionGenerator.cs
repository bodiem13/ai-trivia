using Core.QuestionAPI.Models;
using OpenAI;
using OpenAI.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace QuestionService.Handlers
{
    using OpenAI;
    using OpenAI.Chat;
    using Core.QuestionAPI.Models;
    using System.Text.Json;
    using OpenAI.Responses;

    public class QuestionGenerator
    {
        private readonly ChatClient _chatClient;

        public QuestionGenerator(ChatClient client)
        {
            _chatClient = client;
        }

        public async Task<Question> GenerateQuestionAsync(string topic, string difficulty)
        {
            // Extract for DI
            //var chatClient = new ChatClient(
            //    model: "gpt-4o-mini",
            //    apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY")
            //);

            var messages = BuildCompletionMessage(topic, difficulty);

            ChatCompletion response = await _chatClient.CompleteChatAsync(messages);

            var completion = response.Content[0].Text;

            // TODO test serializer
            var trivia = System.Text.Json.JsonSerializer.Deserialize<Question>(completion);

            return trivia;
        }

        private List<ChatMessage> BuildCompletionMessage(string category, string difficulty)
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
    }
}
