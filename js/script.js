function currentTime() {
  var time = new Date();

  var ampm = true;
  var textAMPM;

  var timeInMin = time.getMinutes();
  var timeInHrs = time.getHours();
  var timeInDay = time.getDate();
  var timeInMo = time.getMonth() + 1;
  var timeInYr = time.getFullYear();

  if (timeInHrs > 12) {
    timeInHrs = timeInHrs - 12;
    ampm = false;
  }

  if (ampm) {
    textAMPM = "AM";
  } else {
    textAMPM = "PM";
  }

  var currentTime = timeInMo + "/" + timeInDay + "/" + timeInYr + " - " + timeInHrs + ":" + timeInMin + " " + textAMPM;
  $("#time").html(currentTime);
}

setInterval(currentTime, 50);