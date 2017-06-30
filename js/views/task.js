/*
 * task.js
 * View for one task in the list on the ScoopEm page
 * David Lenkner, c. 2017
 */

app.views.TaskView = Marionette.View.extend({
	
	el: '', // Be sure to set via el: option to initialize 
	
	initialize: function(options) {
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
		this.task = task_data; // includes id...
	},
	
	render: function() {
		console.log("Rendering a task view.");	
		this.$el.html(this.tpl({
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
		/*
		console.log('Task due-ness calculation:');
		console.log({
			'nowT': nowT,
			'nowTSeconds': nowTSeconds,
			'nSecondsDiff': nSecondsDiff,
			'percentTilOverdue': percentTilOverdue
		});
		*/
		if(percentTilOverdue > 0.9) {
			return 'btn-danger';
		} else if(percentTilOverdue > 0.77) {
			return 'btn-warning';
		} else if(percentTilOverdue > 0.1) {
			return 'btn-primary';
		} else {
			return 'btn-success';
		}
	},
	
	events: {
		'click #do_task': 'doTask',
		'click #edit': 'editTask'
	},

	// Update time last done to now
	doTask: function() {
		console.log('Doing task...');
		var vu = this;
		$.post('php/api.php/updateTask',
			{
				id: vu.task.id
			},
			function(data) {
			// If problem on server, log it
			if(!data.success) {
				console.log(data.errMessage);
			} else {
				// If all ok, save new done time and re-render
				console.log("Success updating task last done t.");
				vu.task.dateLastDone = data.specifics.tStampSeconds;
				vu.render();
			}
		}, 'json');
		
	},
	
	// Edit name or frequency of task
	editTask: function() {
		console.log('Editing task...');
		// TODO navigate to new route for editing name, cycle time, etc
	},
	
	// Empty out main element
	close: function() {
		this.undelegateEvents();
		$(this).empty();
		this.unbind();
	}
});
