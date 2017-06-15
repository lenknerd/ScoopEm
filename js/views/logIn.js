/*
 * logIn.js
 * View for log-in page to get into ScoopEm page
 * David Lenkner, c. 2017
 */

app.views.LogInView = Marionette.View.extend({
	
	el: '#main', // Where it will go in index.html
	
	initialize: function() {
	},
	
	render: function() {
		console.log("Rendering logIn view.");
		var vu = this;
		// Load the template and show it
		$.get('api.php/tpl/logInTemplate', function(data) {
			// Store template function in the view
			vu.tpl = _.template(data);
			vu.$el.html(this.tpl());
		}, 'html');
	},
	
	events: {
	},
	
	// Empty out main element
	close: function() {
		this.undelegateEvents();
		$(this).empty();
		this.unbind();
	}
});
