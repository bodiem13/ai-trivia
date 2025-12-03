using Azure.AI.OpenAI;
using OpenAI.Chat;
using QuestionService;
using QuestionService.Handlers;
using QuestionService.Helpers;
using System.ClientModel;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:3000",
                    "https://gentle-glacier-0aa45030f.3.azurestaticapps.net",
                    "https://ai-trivia-webapp-dev-a0gpgaaseyfngdas.centralus-01.azurewebsites.net")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddSingleton<ChatClient>(sp =>
{
    var endpoint = builder.Configuration["OPENAI_ENDPOINT"];
    var apiKey = builder.Configuration["OPENAI_API_KEY"];
    var deployment = builder.Configuration["OPENAI_DEPLOYMENT"];

    if (string.IsNullOrEmpty(endpoint) ||
        string.IsNullOrEmpty(apiKey) ||
        string.IsNullOrEmpty(deployment))
    {
        throw new Exception("Azure OpenAI settings are missing");
    }

    var client = new AzureOpenAIClient(
        new Uri(builder.Configuration["OPENAI_ENDPOINT"]),
        new ApiKeyCredential(builder.Configuration["OPENAI_API_KEY"])
    );


    return client.GetChatClient(deployment);
});


if (builder.Environment.IsDevelopment())
{
    // Use mock generator in development
    builder.Services.AddScoped<IOpenAIQuestionGenerator, OpenAIQuestionGenerator>();
}
else
{
    // Use real OpenAI generator in production
    builder.Services.AddScoped<IOpenAIQuestionGenerator, OpenAIQuestionGenerator>();
}

builder.Services.AddControllers();
builder.Services.AddScoped<IOpenAIChatMessageHelper, OpenAIChatMessageHelper>();
builder.Services.AddScoped<IQuestionHandler,QuestionHandler>();
builder.Services.AddScoped<IAIQuestionService, AIQuestionService>();

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
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Question API V1");
    });
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.MapControllers();  // map controller routes

app.Run();
