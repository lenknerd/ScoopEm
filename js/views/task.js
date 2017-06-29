/*
 * task.js
 * View for one task in the list on the ScoopEm page
 * David Lenkner, c. 2017
 */

app.views.TaskView = Marionette.View.extend({
	
	el: '#tasks', // Element in which it will go
	
	initialize: function() {
	},
	
	setTemplateAndData: function(task_template, task_data) {
		// Load task template in home view not here, to avoid
		// repeated calls (should be cached anyway but in case)
		this.tpl = task_template;
		/*
		console.log('Initialized, tpl is:');
		console.log(this.tpl);
		console.log('While first argument is:');
		console.log(task_template);
		*/
		this.task = task_data;
	},
	
	render: function() {
		console.log("Rendering a task view.");	
		this.$el.append(this.tpl({
			color: this.getColor(),
			name: this.task.name,
			dateLastDone: this.getTLastDoneString()
		}));
	},

	// Format a date time string in 12-hour mode, with day of week
	getTLastDoneString: function() {
		var milSecs = this.task.dateLastDone * 1000;
		var dateJS = new Date(milSecs);
		var dateStr = dateJS.toString().split(" ").slice(0,3).join(" ");
		var hrs = dateJS.getHours();
		var am_pm_01 = Math.floor(hrs / 12);
		hrs = hrs - (12*am_pm_01);
		var hrs_str = hrs.toString();
		if(hrs == 0) {
			hrs_str = "12";
		}
		var am_pm_str = 'AM';
		if(am_pm_01 > 0) {
			am_pm_str = 'PM';
		}
		var mins = dateJS.getMinutes();
		var min_str = mins.toString();
		if(mins < 10) {
			min_str = "0" + min_str;
		}
		return dateStr + ", " + hrs_str + ":" + min_str + " " + am_pm_str;
	},

	// Decide color based on how close to being overdue the task is
	getColor: function() {
		var nowT = new Date();
		var nowTSeconds = nowT.getTime() / 1000; // Milliseconds to seconds
		var nSecondsDiff = nowTSeconds - this.task.dateLastDone;
		var percentTilOverdue = nSecondsDiff / this.task.cycleTimeSeconds;
		console.log({
			'nowT': nowT,
			'nowTSeconds': nowTSeconds,
			'nSecondsDiff': nSecondsDiff,
			'percentTilOverdue': percentTilOverdue
		});
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
