# Typespec documentation
https://typespec.io/

## Get Started
 - Run tsp init and select the Generic REST API template.
 - Run tsp install to install dependencies.
 - Run tsp compile . to compile the initial file.
 - Run tsp compile . --watch to automatically compile changes on save.


 ## Generate C# Clients
 - `nswag openapi2csclient /input:generated/openapi/openapi.QuestionAPI.yaml /output:generated/QuestionAPI/Clients/GeneratedCients.cs /namespace:Core.QuestionAPI.Clients /GenerateDtoTypes:false`

## Generate C# Models
- `nswag openapi2csclient /input:generated/openapi/openapi.QuestionAPI.yaml /output:generated/QuestionAPI/Models/GeneratedModels.cs /namespace:Core.QuestionAPI.Models /GenerateClientClasses:false`

## nswag

### Add a new API

1. Create the typespec files for the new API
2. Generate the openapi yaml file using `tsp compile Contracts/<NewAPI>/main.tsp --output Contracts/generated/openapi/openapi.<NewAPI>.yaml`
3. Update build.ps1 to include
```
$newApiYaml = Join-Path $ContractsDir "openapi.<NewAPI>.yaml"
Generate-Models -ApiName "<NewAPI>" -InputFile $newApiYaml
Generate-Client -ApiName "<NewAPI>" -InputFile $newApiYaml
```
4. Run `.\build.ps1`

