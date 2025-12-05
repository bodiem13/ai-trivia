using Azure.Storage.Blobs;
using Core.QuestionAPI.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace QuestionService.Handlers
{
    public class QuestionHandler : IQuestionHandler
    {
        private readonly IOpenAIQuestionGenerator _generator;
        private readonly BlobContainerClient _container;

        public QuestionHandler(IOpenAIQuestionGenerator generator, BlobContainerClient container)
        {
            _generator = generator;
            _container = container;
        }

        public async Task<MultipleChoiceQuestionSet> GetOrGenerateTodayQuestionAsync(
            int questionCount,
            string category,
            string difficulty)
        {
            var fileName = BuildFileName(difficulty);

            // 1. Try to read from blob storage
            var storedQuestions = await GetFromStorageAsync(fileName);
            if (storedQuestions != null)
                return storedQuestions;

            // 2. Generate questions
            var standardQuestions = await _generator.GenerateMultipleChoiceQuestionSetAsync(
                MultipleChoiceQuestionType.Standard,
                category,
                difficulty,
                questionCount);

            var opinionQuestion = await _generator.GenerateMultipleChoiceQuestionSetAsync(
                MultipleChoiceQuestionType.Opinion,
                category,
                difficulty,
                1);

            var combinedSet = new MultipleChoiceQuestionSet
            {
                Questions = standardQuestions.Questions
                    .Concat(opinionQuestion.Questions)
                    .ToList()
            };

            // 3. Save to storage
            await SaveToStorageAsync(fileName, combinedSet);

            return combinedSet;
        }

        private async Task SaveToStorageAsync(string fileName, MultipleChoiceQuestionSet questionSet)
        {
            var blob = _container.GetBlobClient(fileName);

            // Serialize using camelCase for frontend compatibility
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(questionSet, options);

            using var stream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(json));
            await blob.UploadAsync(stream, overwrite: true);
        }


        private async Task<MultipleChoiceQuestionSet?> GetFromStorageAsync(string fileName)
        {
            var blob = _container.GetBlobClient(fileName);
            if (!await blob.ExistsAsync())
                return null;

            var result = await blob.DownloadContentAsync();
            var json = result.Value.Content.ToString();
            return JsonSerializer.Deserialize<MultipleChoiceQuestionSet>(json);
        }

        private static string BuildFileName(string difficulty)
        {
            var date = DateTime.UtcNow.ToString("yyyy-MM-dd");
            var cleanDifficulty = difficulty.Trim().ToLowerInvariant();

            // Path: <date>/<difficulty>.json
            return $"{date}/{cleanDifficulty}.json";
        }
    }
}
