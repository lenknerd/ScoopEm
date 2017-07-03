/*
 * home.js
 * View for main base ScoopEm page after logged in, where tasks list is
 * David Lenkner, c. 2017
 */

app.views.HomeView = Marionette.View.extend({
	
	el: '#main', // tbd
	
	initialize: function() {
	},
	
	render: function() {
		console.log("Rendering home view.");
		var vu = this;
		// Load the template and show it
		var load_hometpl = $.get('php/api.php/tpl/homeTemplate',
				function(data) {
			// Store home template function in the view
			vu.tpl = _.template(data);
			vu.$el.html(vu.tpl());
			// console.log('Finished getting home template.');
		});

		var load_tasktpl = $.get('php/api.php/tpl/taskTemplate',
				function(data) {
			// Store task template in the view
			vu.task_tpl = _.template(data);
			/*
			console.log('This should be a function:');
			console.log(vu.task_tpl);
			console.log('Finished getting task template.');
			//*/
		});

		var load_tasks = $.get('php/api.php/getTasks',
				function(data) {
			// If problem on server, log it
			if(!data.success) {
				console.log(data.errMessage);
			} else {
				/* Store tasks temporarily in this view, but will really
				 * reside in the individual tasks */
				// console.log('Finished getting tasks, here is data:');
				// console.log(data);
				vu.tasks = data.specifics.tasks;
			}
		}, 'json');

		// When you've got the home template rendered, loaded task template
		// and also loaded all the tasks, then build task views
		$.when(load_hometpl, load_tasktpl, load_tasks).done(function() {
			// console.log('All done, rendering stuff in home now.');
			vu.task_views = [];
			// Build holder elements for all the tasks
			vu.$el.find('#tasks').html(
					'<div class="taskcontainer"></div>'.repeat(
						vu.tasks.length
			));
			// Sequential loop rendering task views into those els
			for(var ii=0; ii < vu.tasks.length; ii++) {
				var nv = new app.views.TaskView({
					el: '.taskcontainer:eq(' + ii + ')'
				});
				nv.setTemplateAndData(vu.task_tpl, vu.tasks[ii]);
				nv.render();
				vu.task_views.push(nv);
			}
		});
	},
	
	events: {
		'click #logout' : 'requestLogout'
	},

	// Click top-right logout
	requestLogout: function() {
		console.log('Attempting logout...');
		$.get('php/api.php/logout', function(data) {
			console.log('Sucessful logout.');
			app.userName = "";
			app.loggedIn = false;
			app.router.navigate('logIn', {trigger: true});
		});	
	},
	
	// Empty out main element
	close: function() {
		// Close the member views
		$.each( this.task_views, function(i, taskView) {
			taskView.close();
		});

		// Close this view itself
		this.undelegateEvents();
		$(this).empty();
		this.unbind();
	}
});
