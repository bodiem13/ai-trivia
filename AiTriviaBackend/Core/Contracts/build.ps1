# ----------------------------------------
# Build script to generate NSwag clients & models for all APIs
# ----------------------------------------

# Root paths
$ContractsDir = "generated/openapi"
$OutputDir   = "generated"

# Function to generate Models
function Generate-Models {
    param(
        [string]$ApiName,
        [string]$InputFile
    )

    $ModelsOutput = Join-Path $OutputDir "$ApiName/GeneratedModels.cs"

    Write-Host "Generating Models for $ApiName..."
    nswag openapi2csclient `
        /input:"$InputFile" `
        /output:"$ModelsOutput" `
        /namespace:"Core.$ApiName.Models" `
        /GenerateClientClasses:false
}

# Function to generate Client
function Generate-Client {
    param(
        [string]$ApiName,
        [string]$InputFile
    )

    $ClientOutput = Join-Path $OutputDir "$ApiName/GeneratedClients.cs"

    Write-Host "Generating Client for $ApiName..."
    nswag openapi2csclient `
        /input:"$InputFile" `
        /output:"$ClientOutput" `
        /namespace:"Core.$ApiName.Clients" `
        /GenerateDtoTypes:false
}

# ---------------------------
# Example: QuestionAPI
# ---------------------------
$questionApiYaml = Join-Path $ContractsDir "openapi.QuestionAPI.yaml"
Generate-Models -ApiName "QuestionAPI" -InputFile $questionApiYaml
Generate-Client -ApiName "QuestionAPI" -InputFile $questionApiYaml

# ---------------------------
# Add more APIs here
# ---------------------------
# $examApiYaml = Join-Path $ContractsDir "openapi.ExamAPI.yaml"
# Generate-Models -ApiName "ExamAPI" -InputFile $examApiYaml
# Generate-Client -ApiName "ExamAPI" -InputFile $examApiYaml

Write-Host "All NSwag code generation complete!"
