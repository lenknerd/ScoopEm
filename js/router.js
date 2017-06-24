/*
 * router.js
 * Handles switching between "pages" on the site, despite that we never
 * actually reload the entire page.
 * David Lenkner, c. 2017
 */

 // Add the router to the main application (app)
app.router = Marionette.AppRouter.extend({
	
	// Define all of the page routes and the corresponding member function
	routes: {
		"logIn"     : "logIn",
		"home"      : "home"
	},
	
	// Initialize - called when the router starts up, nothing here for now
	initialize: function() {
	},
	
	// Log-in page
	logIn: function() {
		console.log("Navigating to the log-in page...");
		app.showMainView(new app.views.LogInView());
	},

	// Main task list page
	home: function() {
		console.log("Navigating to the home page...");
		app.showMainView(new app.views.HomeView());
	}

});
