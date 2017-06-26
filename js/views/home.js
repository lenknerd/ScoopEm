/*
 * home.js
 * View for main base ScoopEm page after logged in, where tasks list is
 * David Lenkner, c. 2017
 */

app.views.HomeView = Marionette.View.extend({
	
	el: '#main', // Where it will go in index.html
	
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
		}, 'html');

		var load_tasktpl = $.get('php/api.php/tpl/taskTemplate',
				function(data) {
			// Store task template in the view
			vu.task_tpl = _.template(data);
		}, 'html');

		var load_tasks = $.post('php/api.php/getTasks',
				{
					user: app.username
				},
				function(data) {
			// Store tasks temporarily in this view, but will really
			// reside in the individual tasks
			vu.tasks = data.tasks;
		}, 'json');

		// When you've got the home template rendered, loaded task template
		// and also loaded all the tasks, then build task views
		$.when(load_hometpl, load_tasktpl, load_tasks).done(function() {
			vu.task_views = [];
			$.each( vu.tasks, function(i, task) {
				vu.task_views.push(new app.views.TaskView(
							vu.task_tpl,
							vu.data.tasks[i])
						);
				vu.task_views[vu.task_views.length-1].render();
			});
		});
	},
	
	events: {
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
