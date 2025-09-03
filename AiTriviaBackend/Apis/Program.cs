using OpenAI;
using OpenAI.Chat;
using QuestionService;
using QuestionService.Handlers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton(sp =>
{
    var apiKey = builder.Configuration["OpenAI:ApiKey"]
                 ?? Environment.GetEnvironmentVariable("OPENAI_API_KEY");

    if (string.IsNullOrEmpty(apiKey))
        throw new InvalidOperationException("Missing OpenAI API key");

    return new ChatClient(AIQuestionServiceConstants.OpenAIModel, apiKey);
});

builder.Services.AddControllers();
builder.Services.AddSingleton<QuestionHandler>();
builder.Services.AddScoped<OpenAIQuestionGenerator>();
builder.Services.AddScoped<AIQuestionService>();

// Controllers & Swagger/OpenAPI
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Question API",
        Version = "v1"
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();             // must come after AddSwaggerGen
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Question API V1");
    });
}

app.UseHttpsRedirection();
app.MapControllers();  // map controller routes

app.Run();
