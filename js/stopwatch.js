var watch = new stopwatch();

$("#toggleStopwatch").click(function() {
	if (!watch.isOn) {
		watch.start();
		$("#toggleStopwatch").text("Stop");
	} else {
		watch.stop();
		$("#toggleStopwatch").text("Start");
	}
});

$("#lapStopwatch").click(function() {
	watch.lap();
});

$("#clearLap").click(function() {
	$("#showLapStopwatch").html("<strong>Your Laps:</strong>");
});

$("#resetStopwatch").click(function() {
	watch.reset();
});

function stopwatch() {
	var msec = 0;
	var sec = 0;
	var min = 0;
	var hr = 0;
	var interval;

	function update() {
		msec = msec + 1;

		var milliseconds = msec.toString();
		var seconds = sec.toString();
		var minutes = min.toString();
		var hours = hr.toString();

		if (msec == 99) {
			sec = sec + 1;
			msec = 0;
		}

		if (sec == 60) {
			min = min + 1;
			sec = 0;
		}

		if (min == 60) {
			hr = hr + 1;
			min = 0;
		}

		if (milliseconds.length < 2) {
			milliseconds = "0" + milliseconds;
		}

		if (seconds.length < 2) {
			seconds = "0" + seconds;
		}

		if (minutes.length < 2) {
			minutes = "0" + minutes;
		}

		if (hours.length < 2) {
			hours = "0" + hours;
		}

		var time = hours + " : " + minutes + " : " + seconds + " <sub>" + milliseconds + "</sub>";

		$("#showStopwatch").html(time);
	}

	this.isOn = false;

	this.start = function() {
		if (!this.isOn) {
			interval = setInterval(update, 10);
			this.isOn = true;
		}
	};

	this.stop = function() {
		if (this.isOn) {
			clearInterval(interval);
			this.isOn = false;
		}
	};

	this.lap = function() {
		var milliseconds = msec.toString();
		var seconds = sec.toString();
		var minutes = min.toString();
		var hours = hr.toString();

		if (milliseconds.length < 2) {
			milliseconds = "0" + milliseconds;
		}

		if (seconds.length < 2) {
			seconds = "0" + seconds;
		}

		if (minutes.length < 2) {
			minutes = "0" + minutes;
		}

		if (hours.length < 2) {
			hours = "0" + hours;
		}

		var time = hours + " : " + minutes + " : " + seconds + " <sub>" + milliseconds + "</sub>";

		document.getElementById('showLapStopwatch').innerHTML += "<br>" + time;
	};

	this.reset = function() {
		if (!this.isOn) {
			msec = 0;
			sec = 0;
			min = 0;
			hr = 0;

			var milliseconds = msec.toString();
			var seconds = sec.toString();
			var minutes = min.toString();
			var hours = hr.toString();

			if (milliseconds.length < 2) {
				milliseconds = "0" + milliseconds;
			}

			if (seconds.length < 2) {
				seconds = "0" + seconds;
			}

			if (minutes.length < 2) {
				minutes = "0" + minutes;
			}

			if (hours.length < 2) {
				hours = "0" + hours;
			}

			var time = hours + " : " + minutes + " : " + seconds + " <sub>" + milliseconds + "</sub>";

			$("#showStopwatch").html(time);
		}
	};
}