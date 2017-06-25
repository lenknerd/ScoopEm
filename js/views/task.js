/*
 * task.js
 * View for one task in the list on the ScoopEm page
 * David Lenkner, c. 2017
 */

app.views.TaskView = Marionette.View.extend({
	
	el: '#task', // Element in which it will go
	
	initialize: function(task_template, task_data) {
		// Load task template in home view not here, to avoid
		// repeated calls (should be cached anyway but in case)
		this.tpl = task_template;
		this.task = task_data;
	},
	
	render: function() {
		console.log("Rendering a task view.");
		vu.$el.append(this.tpl(this.task));
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
