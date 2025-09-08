using OpenAI.Chat;
using Core.QuestionAPI.Models;
using QuestionService.Helpers;

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

            // TODO test serializer
            var trivia = System.Text.Json.JsonSerializer.Deserialize<MultipleChoiceQuestionSet>(completion);

            return trivia;
        }
    }
}
