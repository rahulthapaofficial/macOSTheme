let months = [
  {
    0: "Jan",
    1: "January",
  },
  {
    0: "Feb",
    1: "Februry",
  },
  {
    2: "Mar",
    2: "March",
  },
  {
    3: "Apr",
    3: "April",
  },
  {
    4: "May",
    4: "May",
  },
  {
    5: "Jun",
    5: "June",
  },
  {
    6: "Jul",
    6: "July",
  },
  {
    0: "Aug",
    1: "August",
  },
  {
    8: "Sep",
    8: "September",
  },
  {
    9: "Oct",
    9: "October",
  },
  {
    0: "Nov",
    1: "November",
  },
  {
    0: "Dec",
    1: "December",
  },
];
let weeks = [
  {
    0: "Sun",
    1: "Sunday",
  },
  {
    0: "Mon",
    1: "Monday",
  },
  {
    0: "Tue",
    1: "Tuesday",
  },
  {
    0: "Wed",
    1: "Wednesday",
  },
  {
    0: "Thu",
    1: "Thursday",
  },
  {
    0: "Fri",
    1: "Friday",
  },
  {
    0: "Sat",
    1: "Saturday",
  },
];

const analogHour = document.querySelector("#clock-hour"),
  analogMinutes = document.querySelector("#clock-minutes"),
  analogSeconds = document.querySelector("#clock-seconds"),
  weekDays = document.querySelector("#weekDays");

weeks.forEach(function (day, index) {
  var node = document.createElement("span");
  var textnode = document.createTextNode(day[0]);
  node.appendChild(textnode);
  node.style.color = checkTodayWeekDay() == index ? "#fff" : "#505050";
  weekDays.appendChild(node);
});

function checkTodayWeekDay() {
  let today = new Date();
  let weekDay = today.getDate();
  return weekDay - 1;
}

function startTime() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();
  let weekDay = today.getDate();
  console.log(`${year} ${months[month]} ${day} ${weeks[weekDay]}`);
  let hours = today.getHours();
  let minutes = checkTime(today.getMinutes());
  let seconds = checkTime(today.getSeconds());
  let dayType = "AM";
  if (hours > 11) {
    dayType = "PM";
  } else dayType = "AM";
  hours = checkTime(hourFormat(today.getHours()));
  let topBarDate = `${weeks[weekDay - 1][0]} ${months[month][0]} ${day}`;
  let liveTimeClock = `<span class="mr-10" title="${topBarDate}">${topBarDate}</span> ${hours}:${minutes}`;
  let clockDate = `${weeks[weekDay - 1][1]}, ${day} ${
    months[month][0]
  }, ${year}`;

  let hh = today.getHours() * 30,
    mm = today.getMinutes() * 6,
    ss = today.getSeconds() * 6;
  analogHour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  analogMinutes.style.transform = `rotateZ(${mm}deg)`;
  analogSeconds.style.transform = `rotateZ(${ss}deg)`;

  document.querySelector(
    "#liveLockScreenTime"
  ).innerHTML = `${hours}:${minutes}`;
  document.querySelector("#liveLockScreenTimeAMPM").innerHTML = dayType;
  document.querySelector("#lockscreenClockDate").innerHTML = clockDate;
  document.querySelector(
    "#liveTimeClock"
  ).innerHTML = `${liveTimeClock} ${dayType}`;
  document.querySelector(
    "#liveTimeClock2"
  ).innerHTML = `${hours}:${minutes}:${seconds}`;
  document.querySelector("#liveTimeAMPM").innerHTML = dayType;
  document.querySelector("#clockDate").innerHTML = clockDate;
  setTimeout(startTime, 1000);
}

function checkTime(time) {
  if (time < 10) time = `0${time}`;
  return time;
}

function hourFormat(hour) {
  if (hour > 12) hour = hour - 12;
  return hour;
}
startTime();
