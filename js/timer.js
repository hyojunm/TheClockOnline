var clock = new timer();

$("#setTimer").click(function() {
	clock.set();
});

$("#dismissTimer").click(function() {
	clock.dismiss();
})

$("#cancelTimer").click(function() {
	clock.cancel();
});

function timer() {
	var hr;
	var min;
	var sec;
	var interval;

	function update() {
		if (sec == 0) {
			if (min == 0 && hr == 0) {
				timeIsUp();
				return;
			} else if (min == 0 && hr !== 0) {
				min = 60;
				hr = hr - 1;
				sec = 60;
			} else if (min !== 0 && hr == 0) {
				min = min - 1;
				sec = 60;
			}
		}

		sec = sec - 1;

		var hours = hr.toString();
		var minutes = min.toString();
		var seconds = sec.toString();

		if (seconds.length < 2) {
		seconds = "0" + seconds;
		}

		if (minutes.length < 2) {
			minutes = "0" + minutes;
		}

		if (hours.length < 2) {
			hours = "0" + hours;
		}

		var time = hours + " : " + minutes + " : " + seconds;
		$("#showTimer").html(time);
	}

	function timeIsUp() {
		clearInterval(interval);
		$("#setTimerFields").show();
		$("#setTimer").show();
		$("#showTimer").html("Time's Up!");
		$("#dismissTimer").show();
		$("#cancelTimer").hide();
		document.getElementById('timerSound').play();
	}

	this.set = function() {
		hr = $("#setTimerinHrs").val();
		min = $("#setTimerinMins").val();
		sec = $("#setTimerinSecs").val();

		if (min >= 60 || sec >= 60) {
			$("#showTimer").html("Please enter a minute/second value of less than 60.").css("color", "red");
			return;
		} else if (hr < 0 || min < 0 || sec < 0) {
			$("#showTimer").html("Please enter a positive hour/minute/second value.").css("color", "red");
			return;
		} else if (hr == 0 && min == 0 && sec == 0) {
			$("#showTimer").html("Please enter a time of more than 0.").css("color", "red");
		} else {
			var hours = hr.toString();
			var minutes = min.toString();
			var seconds = sec.toString();

			if (seconds.length < 2) {
			seconds = "0" + seconds;
			}

			if (minutes.length < 2) {
				minutes = "0" + minutes;
			}

			if (hours.length < 2) {
				hours = "0" + hours;
			}

			var time = hours + " : " + minutes + " : " + seconds;

			$("#setTimerFields").hide();
			$("#setTimer").hide();
			$("#cancelTimer").show();
			$("#showTimer").html(time).css("color", "black");

			interval = setInterval(update, 1000);
		}
	};

	this.cancel = function() {
		var ask = confirm("Are you sure you want to cancel timer?");

		if (ask == true) {
			clearInterval(interval);
			$("#showTimer").html("Timer has been canceled.");
			$("#setTimerFields").show();
			$("#setTimer").show();
			$("#cancelTimer").hide();
		} else {
			return;
		}
	};

	this.dismiss = function() {
		document.getElementById('timerSound').pause();
		$("#dismissTimer").hide();
	};
}