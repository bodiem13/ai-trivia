using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Core.QuestionAPI.Models;
using Moq;
using NUnit.Framework;
using QuestionService.Handlers;

namespace QuestionService.Tests;

[TestFixture]
public class QuestionHandlerTests
{
    private Mock<IOpenAIQuestionGenerator> _mockGenerator;
    private Mock<BlobContainerClient> _mockContainerClient;
    private QuestionHandler _handler;

    [SetUp]
    public void Setup()
    {
        _mockGenerator = new Mock<IOpenAIQuestionGenerator>();
        _mockContainerClient = new Mock<BlobContainerClient>();
        _handler = new QuestionHandler(_mockGenerator.Object, _mockContainerClient.Object);
    }

    [Test]
    public async Task GetTodayQuestions_ReturnsExpectedQuestions()
    {
        // Arrange
        var fakeQuestions = new MultipleChoiceQuestionSet
        {
            Questions = new[]
            {
                new MultipleChoiceQuestion
                {
                    Id = Guid.NewGuid(),
                    Question = "What is 2+2?",
                    Options = new[]
                    {
                        new MultipleChoiceOption { Id = "A", Text = "3" },
                        new MultipleChoiceOption { Id = "B", Text = "4" },
                        new MultipleChoiceOption { Id = "C", Text = "5" },
                        new MultipleChoiceOption { Id = "D", Text = "6" }
                    },
                    CorrectAnswer = new MultipleChoiceOption { Id = "B", Text = "4" },
                    Type = MultipleChoiceQuestionType.Standard
                }
            }
        };

        _mockGenerator
            .Setup(g => g.GenerateMultipleChoiceQuestionSetAsync(
                It.IsAny<MultipleChoiceQuestionType>(),
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<int>()))
            .ReturnsAsync(fakeQuestions);

        // Act
        var result = await _handler.GetOrGenerateTodayQuestionAsync(2, "General", "Easy");

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Questions.Count, Is.EqualTo(2));
        Assert.That(result.Questions.ElementAt(0).Question, Is.EqualTo("What is 2+2?"));
    }
}
