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
    0: "Mar",
    1: "March",
  },
  {
    0: "Apr",
    1: "April",
  },
  {
    0: "May",
    1: "May",
  },
  {
    0: "Jun",
    1: "June",
  },
  {
    0: "Jul",
    1: "July",
  },
  {
    0: "Aug",
    1: "August",
  },
  {
    0: "Sep",
    1: "September",
  },
  {
    0: "Oct",
    1: "October",
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

const nextTerminalLine = `<p>rahulthapa@macOS:~<input type="text" id="userCommand" class="terminalCommandInput ml-5" autofocus autocomplete="off"></p>`;

const terminalHelpText =
  "<p style='color: #168dcc'>Use :help to show macOS commands</p>";

const userInfoField = `<p>userInfo> What is your Name?:<input type="text" id="userName" class="terminalCommandInput ml-5" autofocus autocomplete="off"></p>`;

const terminalMapSection = `<div id="terminalMapSection">
      <div id="terminalMap"></div>
      <input type="hidden" class="form-control" id="lat">
      <input type="hidden" class="form-control" id="lng">
  </div>`;

const terminalCommands = {
  clear: "To clear the screen",
  ipconfig: "To get Public IP",
  time: "To get Current Time",
  whoami: "To get Your Information",
  whereami: "To get Your Current Location",
  exit: "To close terminal",
};

document.addEventListener(
  "contextmenu",
  (event) => {
    event.preventDefault();
  },
  false
);

const initialUserInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const initialUserCommands = localStorage.getItem("userCommands")
  ? JSON.parse(localStorage.getItem("userCommands"))
  : {};

const storeUserInfo = (userInfo) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify(Object.keys(userInfo).length > 0 ? userInfo : {})
  );
};

const storeUserCommands = (command) => {
  localStorage.setItem(
    "userCommands",
    JSON.stringify(Object.keys(command).length > 0 ? command : [])
  );
};
storeUserInfo(initialUserInfo);
storeUserCommands(initialUserCommands);

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
  let weekDay = today.getDay();
  let hours = today.getHours();
  let minutes = checkTime(today.getMinutes());
  let seconds = checkTime(today.getSeconds());
  let dayType = "AM";
  if (hours > 11) {
    dayType = "PM";
  } else dayType = "AM";
  hours = checkTime(hourFormat(today.getHours()));
  let topBarDate = `${weeks[weekDay][0]} ${months[month][0]} ${day}`;
  let liveTimeClock = `<span class="mr-10" title="${topBarDate}">${topBarDate}</span> ${hours}:${minutes}`;
  let clockDate = `${weeks[weekDay][1]}, ${day} ${months[month][0]}, ${year}`;

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
  else if (hour === 0) hour = 12;
  return hour;
}
startTime();
