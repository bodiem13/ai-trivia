import "@typespec/http";

// Import all APIs
import "./QuestionAPI/models.tsp";
import "./QuestionAPI/routes.tsp";

/**
 * Root service definition
 */
@service(#{ title: "APIs" })
namespace APIs;