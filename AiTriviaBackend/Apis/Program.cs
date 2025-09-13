using OpenAI;
using OpenAI.Chat;
using QuestionService;
using QuestionService.Handlers;
using QuestionService.Helpers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ChatClient>(sp =>
{
    var apiKey = builder.Configuration["OPENAI_API_KEY"]; // from secrets
    return new ChatClient(AIQuestionServiceConstants.OpenAIModel, apiKey);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:3000") // Your Next.js dev URL
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

if (builder.Environment.IsDevelopment())
{
    // Use mock generator in development
    builder.Services.AddScoped<IOpenAIQuestionGenerator, MockOpenAIQuestionGenerator>();
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
