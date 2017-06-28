<?php
session_start();
/* api.php
 * Main server-side API for application, directs requests to proper
 * php function, also will handle authentication via Slim middleware
 * David Lenkner, c. 2017
 */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require_once 'templates.php';
require_once 'authentication.php';
require_once 'utils.php';
require_once 'scoopem_utils.php';

$app = new \Slim\App;

// Route for getting an html template for use in a view
$app->get('/tpl/{name}', function($request, $response, $args) {
	$templateName = $request->getAttribute('name');

	// Special view-specific handling... loads some template from file
	echo handleTemplateSpecifics($templateName);
});

// Route for attempting to log in
$app->post('/login', function() {
	validateAndCreateSession($_POST['username'], $_POST['password']);
});

// Middleware function to return empty error response if not logged in
$RequireAuthMW = function ($request, $response, $next) {
	if( ! hasValidSession() ) {
		$rsp = new JsonResponse_Basic("Authentication required for route.");
		$rsp->respondAndExit();
	}
	$response = $next($request, $response);
	return $response;
};

// Route for logging out (must be logged in to do this)
$app->get('/logout', function() {
	endLogInSession();
})->add($RequireAuthMW);

// Route for requesting task data
$app->get('/getTasks', function() {
	// Gets JsonResponse object
	$respon = tasksResponse();
	// This echoes the JSON response
	$respon->respondAndExit();
})->add($RequireAuthMW);


// Run the application
$app->run();

?>
