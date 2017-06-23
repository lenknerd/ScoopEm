/*
 * main.js
 * View for main ScoopEm page after logged in
 * David Lenkner, c. 2017
 */

app.views.MainView = Marionette.View.extend({
	
	el: '#main', // Where it will go in index.html
	
	initialize: function() {
	},
	
	render: function() {
		console.log("Rendering main view.");
		var vu = this;
		// Load the template and show it
		$.get('php/api.php/tpl/mainTemplate', function(data) {
			// Store template function in the view
			vu.tpl = _.template(data);
			vu.$el.html(vu.tpl());
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
