# Typespec documentation
https://typespec.io/

## Get Started
 - Run tsp init and select the Generic REST API template.
 - Run tsp install to install dependencies.
 - Run tsp compile . to compile the initial file.
 - Run tsp compile . --watch to automatically compile changes on save.


 ## Generate C# Clients
 - nswag openapi2csclient /input:generated/openapi/openapi.QuestionAPI.yaml /output:generated/QuestionAPI/Clients/GeneratedCients.cs /namespace:Core.QuestionAPI.Clients /GenerateDtoTypes:false

## Generate C# Models
- nswag openapi2csclient /input:generated/openapi/openapi.QuestionAPI.yaml /output:generated/QuestionAPI/Models/GeneratedModels.cs /namespace:Core.QuestionAPI.Models /GenerateClientClasses:false

