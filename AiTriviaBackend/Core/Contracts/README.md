# Typespec documentation
https://typespec.io/

## Get Started
 - Run tsp init and select the Generic REST API template.
 - Run tsp install to install dependencies.
 - Run tsp compile . to compile the initial file.
 - Run tsp compile . --watch to automatically compile changes on save.


 ## Generate C# Models
 - nswag openapi2csclient /input:openapi.yaml /output:GeneratedClient.cs /namespace:Core.Models