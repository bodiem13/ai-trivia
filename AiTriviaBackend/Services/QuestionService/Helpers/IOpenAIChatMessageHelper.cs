using OpenAI.Chat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuestionService.Helpers
{
    public interface IOpenAIChatMessageHelper
    {
        List<ChatMessage> BuildStandardMultipleChoiceQuestionChatMessage(string category, string difficulty, int questionCount);

        List<ChatMessage> BuildOpinionMultipleChoiceQuestionChatMessage(string category, string difficulty, int questionCount);
    }
}
