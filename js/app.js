/*
 * app.js
 * This is the main application object, contains the router to
 * track which page you're on, also contains some application-wide data
 * David Lenkner, c. 2017
 */

// Define app as extension of Marionette Application
var app = Marionette.Application.extend({
	
	initialize: function() {
	},
	
	router: {}, // The router-to-be
	views: {}, // The views-to-be
	
	servBaseURL_s: "", // https base page address

	/* Whether logged in.  Note, also maintained on server, server deny an
	 * unauthorized request regardless of this variable.  The extra copy here
	 * is just for speed, non-essential checks dont have to go out */
	loggedIn: false,
	userName: "",

	mainView: null,
	
	/* Take a pre-defined view (usually declared in router) and show it in the
	 * main element, storing view here in app.mainView. Also close last. */
	showMainView: function(view) {
		if(this.mainView) {
			console.log('Closing main view...');
			this.mainView.close();
		}
		this.mainView = view;
		console.log('Rendering main view...');
		this.mainView.render();
	}

});

// Initialize the application (declaring with "new" forces run of init)
var app = new app();


/* Define things that happen when we start the application.
 * Runs when you call app.start(). 
 */
app.on("start", function() {
	// Set up base url of web service
	app.servBaseURL_s = 'https://' + location.host;
	console.log("Started with servBaseURL_s " + app.servBaseURL_s);
	

	// Start the router (this handles page navigation)
	app.router = new app.router();

	/* This keeps track of #locations so you can use back button
	 * even though there aren't any full-page refreshes */
	console.log("Starting router.");
	Backbone.history.start();
	
	// Check session status from server, then dep on result...
	$.get('php/api.php/checkSession', function(data) {
		if(data.success) {
			// We're logged in, set user and go to home
			app.loggedIn = true;
			app.userName = data.
			app.router.navigate('home', {trigger: true});
		} else {
			app.loggedIn = false;
			app.userName = "";
			app.router.navigate('logIn', {trigger: true});
		}
	});
});

// Run the app once everything on the HTML side has loaded
$(document).on("ready", function() {
	console.log("Starting!");
	app.start();
});
