using Core.QuestionAPI.Models;
using Azure.Storage.Blobs;
using System.Text.Json;

namespace QuestionService.Handlers
{
    public class QuestionHandler : IQuestionHandler
    {
        private readonly IOpenAIQuestionGenerator _openAIQuestionGenerator;
        private readonly BlobContainerClient _containerClient;

        public QuestionHandler(IOpenAIQuestionGenerator openAIQuestionGenerator, BlobContainerClient containerClient)
        {
            _openAIQuestionGenerator = openAIQuestionGenerator;
            _containerClient = containerClient;
        }

        /// <summary>
        /// Retrieves today's question set from storage, or generates a new one if none exists.
        /// </summary>
        public async Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync(
            int questionCount,
            string category,
            string difficulty)
        {
            var filename = GetTodayFilename();

            // Try to get existing questions from storage
            var stored = await TryGetQuestionsAsync(filename);
            if (stored != null)
                return stored;

            // Generate new questions
            var standardQuestions = await _openAIQuestionGenerator.GenerateMultipleChoiceQuestionSetAsync(
                MultipleChoiceQuestionType.Standard, category, difficulty, questionCount);

            var opinionQuestion = await _openAIQuestionGenerator.GenerateMultipleChoiceQuestionSetAsync(
                MultipleChoiceQuestionType.Opinion, category, difficulty, 1);

            var combinedSet = new MultipleChoiceQuestionSet
            {
                Questions = standardQuestions.Questions.Concat(opinionQuestion.Questions).ToList()
            };

            // Store generated questions
            await SaveQuestionsAsync(filename, combinedSet);

            return combinedSet;
        }

        /// <summary>
        /// Stores a MultipleChoiceQuestionSet in blob storage.
        /// </summary>
        private async Task SaveQuestionsAsync(string filename, MultipleChoiceQuestionSet questionSet)
        {
            var blobClient = _containerClient.GetBlobClient(filename);
            var json = JsonSerializer.Serialize(questionSet);
            using var ms = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(json));
            await blobClient.UploadAsync(ms, overwrite: true);
        }

        /// <summary>
        /// Attempts to retrieve a stored question set. Returns null if not found.
        /// </summary>
        private async Task<MultipleChoiceQuestionSet?> TryGetQuestionsAsync(string filename)
        {
            var blobClient = _containerClient.GetBlobClient(filename);

            if (!await blobClient.ExistsAsync())
                return null;

            var download = await blobClient.DownloadContentAsync();
            var json = download.Value.Content.ToString();
            return JsonSerializer.Deserialize<MultipleChoiceQuestionSet>(json);
        }

        /// <summary>
        /// Generates a filename for today's date.
        /// </summary>
        private string GetTodayFilename() => $"questions-{DateTime.UtcNow:yyyy-MM-dd}.json";
    }
}
