using Core.QuestionAPI.Models;
using OpenAI.Chat;
using QuestionService.Helpers;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace QuestionService.Handlers
{
    public class OpenAIQuestionGenerator : IOpenAIQuestionGenerator
    {
        private readonly ChatClient _chatClient;
        private readonly IOpenAIChatMessageHelper _chatMessageHelper;
        public OpenAIQuestionGenerator(ChatClient client, IOpenAIChatMessageHelper chatMessageHelper)
        {
            _chatClient = client;
            _chatMessageHelper = chatMessageHelper;
        }

        public async Task<MultipleChoiceQuestionSet> GenerateMultipleChoiceQuestionSetAsync(MultipleChoiceQuestionType questionType, string topic, string difficulty, int questionCount)
        {
            var chatMessage = new List<ChatMessage>();
            if (questionType == MultipleChoiceQuestionType.Standard)
            {
                chatMessage = _chatMessageHelper.BuildStandardMultipleChoiceQuestionChatMessage(topic, difficulty, questionCount);
            }
            else if (questionType == MultipleChoiceQuestionType.Opinion)
            {
                chatMessage = _chatMessageHelper.BuildOpinionMultipleChoiceQuestionChatMessage(topic, difficulty, questionCount);
            }
            else
            {
                throw new ArgumentException("Invalid question type");
            }

            ChatCompletion response = await _chatClient.CompleteChatAsync(chatMessage);

            var completion = response.Content[0].Text;

            // must add enum converter since tsp does not support json converters or attributes 
            var trivia = JsonSerializer.Deserialize<MultipleChoiceQuestionSet>(
                completion,
                new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    Converters =
                    {
                        new JsonStringEnumConverter()
                    }
                }
            );

            return trivia;
        }
    }
}
