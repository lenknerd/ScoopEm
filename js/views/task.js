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
		this.$el.append(this.tpl({
			color: this.getColor,
			taskName: this.task.name,
			dateLastDone: this.task.dateLastDone
		}));
	},

	// Decide color based on how close to being overdue the task is
	getColor: function() {		
		var nowT = new Date();
		var nSecondsDiff = nowT.getTime() - this.task.dateLastDone.getTime();
		var percentTilOverdue = nSecondsDiff / this.task.cycleTimeSeconds;
		if(percentTilOverdue > 0.9) {
			return 'btn-success';
		} else if(percentTilOverdue > 0.33) {
			return 'btn-primary';
		} else if(percentTilOverdue > 0.1) {
			return 'btn-warning';
		} else {
			return 'btn-danger';
		}
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
