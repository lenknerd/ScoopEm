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
		$.get('php/api.php/tpl/logInTemplate', function(data) {
			// Store template function in the view
			vu.tpl = _.template(data);
			vu.$el.html(vu.tpl());
		}, 'html');
	},
	
	events: {
		'click .subm' : 'sendLogInInfo'
	},

	sendLogInInfo: function() {
		var uAndP = {
			'username': $('#userName').val(),
			'password': $('#password').val()
		};
		console.log("Submitting log in request...");
		console.log(uAndP);
		$.ajax({
			type: 'POST',
			url: 'api.php/login',
			data: uAndP,
			dataType: 'json',
			success: function(data) {
				// Note this is success of the query, not necessarily log-in...
				console.log("Log-in request returned.");
				if(data.success) {
					// Here's where we know username/password is correct
					console.log("Log-in info was right.");
					app.loggedIn = true;
					app.userName = data.specificString;
					// Navigate to main screen
					// TODO - add
					// app.router.navigate('main', {trigger: true} );
				} else {
					console.log("Something went wrong with log-in.");
					var warnHTML = '<strong>Log-in error!</strong> ';
					warnHTML += data.errMessage;
					$('#logInErrorAlert').html( warnHTML );
					$('#logInErrorAlert').show();
				}
			}
		});

	},
	
	// Empty out main element
	close: function() {
		this.undelegateEvents();
		$(this).empty();
		this.unbind();
	}
});
