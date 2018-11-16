# TheClockOnline
- An online clock with features such as stopwatch, timer, world clock, etc.
- Below are source codes for all features; HTML on top & JS on bottom; CSS code is on the very bottom

# Stopwatch

      <div id="stopwatch" class="content">
        <h3 class="heading">Stopwatch</h3>
        <hr>

        <p id="showStopwatch">00 : 00 : 00 <sub>00</sub></p>
        <br>
        <div class="control-btn">
          <center>
            <button id="toggleStopwatch">Start</button>
            <button id="lapStopwatch">Lap</button>
            <button id="clearLap">Clear Laps</button>
            <button id="resetStopwatch">Reset</button>

            <br><br>
            <p id="showLapStopwatch" style="font-size: 20px"><strong>Your Laps:</strong></p>
          </center>
        </div>
      </div>
      
<hr>
      
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
      
# Timer

    <div id="timer" class="content">
			<h3 class="heading">Timer</h3>
			<hr>

			<p id="showTimer"></p>
			<audio id="timerSound" loop>
				<source src="./sounds/timer.wav" type="audio/wav">
				Sorry, your browser does not support HTML5 audio.
			</audio>
			
			<div id="setTimerFields">
				<center>
					<h3>Set Time for Stopwatch:</h3>
					<input type="number" id="setTimerinHrs" class="inputText" value="0"> H <br><br>
					<input type="number" id="setTimerinMins" class="inputText" value="0"> M <br><br>
					<input type="number" id="setTimerinSecs" class="inputText" value="0"> S <br><br>
				</center>
			</div>

			<div class="control-btn">
				<center>
					<button id="setTimer">Set Timer</button>
					<button id="dismissTimer" style="display: none;">Dismiss</button>
					<button id="cancelTimer" style="display: none;">Cancel</button>
				</center>
			</div>
		</div>
    
<hr>

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
    
# CSS Code

    /*
    Google Fonts:
    font-family: 'Sigmar One', cursive;
    font-family: 'Boogaloo', cursive;
    */

    .top-heading-h1 {
      font-family: 'Sigmar One', cursive;
      font-size: 50px;
    }

    .top-heading-h3 {
      font-family: 'Sigmar One', cursive;
      font-size: 30px;
    }

    .heading {
      font-family: 'Boogaloo', cursive;
      font-size: 40px;
    }

    .topnav {
      text-align: center;
      padding: 16px;
      position: sticky;
      font-family: 'Sigmar One', cursive;
      border: 2px solid black;
      margin: 36px;
    }

    .topnav a {
      margin-left: 50px;
      margin-right: 50px;
      display: inline-block;
      border-bottom: 2px dotted black;
      color: black;
    }

    .topnav a:hover {
      border-bottom: 2px solid black;
      text-decoration: none;
      color: black;
    }

    .topnav a:active {
      color: black;
    }

    body {
      height: 200vh;
    }

    #timer, #stopwatch, #alarm {
      padding-top: 10px;
    }

    #showStopwatch {
      font-size: 60px;
      text-align: center;
      font-family: 'Boogaloo', cursive;
    }

    #showTimer {
      font-size: 60px;
      text-align: center;
      font-family: 'Boogaloo', cursive;
    }

    button {
      margin: auto;
      border: 2px solid black;
      background-color: white;
      color: black;
      border-radius: 4px;
      cursor: pointer;
      padding: 16px;
      margin-left: 16px;
      margin-right: 16px;
      font-size: 16px;
      font-family: 'Boogaloo', cursive;
    }

    button:hover {
      background-color: black;
      color: white;
    }

    .content {
      border: 3px solid black;
      margin: 16px;
      padding: 16px;
      font-family: 'Boogaloo', cursive;
    }

    .control-btn {
      border: 2px solid red;
      width: cover;
      padding: 16px;
    }

    .inputText {
      text-align: center;
    }
