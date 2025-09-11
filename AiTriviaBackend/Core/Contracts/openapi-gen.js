const { generate } = require("openapi-typescript-codegen");

console.log("Running codegen...");

generate({
  input: "./generated/openapi/openapi.QuestionAPI.yaml",
  output: "../../../ai-trivia-ui/packages/QuestionAPI/src",
  httpClient: "fetch",
  useOptions: true,
  exportCore: true,
  exportServices: true,
  exportModels: true,
});
