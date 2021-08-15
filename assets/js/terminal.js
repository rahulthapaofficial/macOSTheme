const nextTerminalLine = `<p>rahulthapa@macOS:~<input type="text" id="userCommand" class="terminalCommandInput ml-5" autofocus autocomplete="off"></p>`;

const terminalHelpText =
  "<p style='color: #168dcc'>Use :help to show macOS commands</p>";

const userInfoField = `<p><span class="text-info">userInfo></span> What is your Name?:<input type="text" id="userName" class="terminalCommandInput ml-5" autofocus autocomplete="off"></p>`;

const terminalMapSection = `<div id="terminalMapSection">
      <div id="terminalMap"></div>
      <input type="hidden" class="form-control" id="lat">
      <input type="hidden" class="form-control" id="lng">
  </div>`;

const terminalCommandInfo = {
  clear: "To clear the screen",
  ipconfig: "To get Public IP",
  time: "To get Current Time",
  whoami: "To get Your Information",
  whereami: "To get Your Current Location",
  restart: "To Restart Your System",
  "restart c": "To Cancel Restart",
  shutdown: "To Shutdown Your System",
  "shutdown c": "To Cancel Shutdown",
  lock: "To Lock Your System",
  exit: "To close terminal",
};

const help = () => {
  let terminalCommandHelp = "";
  $.each(terminalCommandInfo, function (key, value) {
    terminalCommandHelp += `<p class="terminalCommandHelp ml-10">${key}<span style="color: green"> - ${value}</span></p>`;
  });
  terminalCommandOutput(terminalCommandHelp);
};

const ipconfig = () => {
  fetch("https://api.ipify.org/?format=json")
    .then((resp) => resp.json())
    .then((ip) => {
      let publicIp = ip.ip;
      let commandResult = `<p>inet ${publicIp} netmask 255.255.255.0</p>`;
      terminalCommandOutput(commandResult);
    })
    .catch((error) => {
      let result = `<p class="text-warning ml-10">${error}</p>`;
      terminalCommandOutput(result);
    });
};

const whoami = () => {
  let storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (Object.keys(storageUserInfo).length) {
    let name = storageUserInfo.name;
    let result = `<p class="terminalCommandHelp ml-10">Your name is <strong>${name}</strong></p>`;
    terminalCommandOutput(result);
  } else {
    $("#terminalContent").append(userInfoField);
    document.querySelector("#userName").focus();
  }
};

const whereami = () => {
  getCurrentLocation();
};

const time = () => {
  let currentTime = new Date();
  let result = `<p class="ml-10"><span class="text-info">Current Time:</span> ${currentTime}</p>`;
  terminalCommandOutput(result);
};

const lock = () => {
  let screenLockTime = new Date($.now());
  let result = `<p class="ml-10"><span class="text-info">System Locked at:</span> ${screenLockTime}</p>`;
  $("#lockscreenContainer").slideDown();
  terminalCommandOutput(result);
};

const restart = () => {
  let result = `<p class="ml-10">Your System will automatically restart in 15 seconds.</p>`;
  setTimeout(() => {
    location.reload();
  }, 15000);
  terminalCommandOutput(result);
};

const shutdown = () => {
  let result = `<p class="ml-10">Your System will automatically shutdown in 15 seconds.</p>`;
  setTimeout(() => {
    window.top.close();
  }, 15000);
  terminalCommandOutput(result);
};

const clear = () => {
  terminalCommandOutput(false);
};

const terminalCommands = {
  ":help": help,
  ipconfig,
  whoami,
  whereami,
  time,
  lock,
  restart,
  shutdown,
  clear,
};

var commandPosition = -1;
$(document).on("keydown", "#userCommand", function (e) {
  let storageUserCommands = JSON.parse(localStorage.getItem("userCommands"));
  switch (e.which) {
    case 38: // up
      if (commandPosition >= storageUserCommands.length - 1) break;
      commandPosition += 1;
      $(this).val(storageUserCommands[commandPosition]);
      break;
    case 40: // down
      if (commandPosition < 0) break;
      commandPosition -= 1;
      $(this).val(storageUserCommands[commandPosition]);
      break;

    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

$(document).on("keypress", "#userCommand", function (e) {
  let userCommand = $(this).val().toLowerCase();
  var keycode = e.keyCode ? e.keyCode : e.which;
  if (keycode == 13) {
    $(this).val(userCommand);
    commandPosition = -1;
    if (userCommand != "") {
      let allUserCommands = JSON.parse(localStorage.getItem("userCommands"));
      allUserCommands.unshift(userCommand);
      storeUserCommands(allUserCommands);
    }
    $(this).removeAttr("autofocus").prop("readonly", true);
    $(this).removeAttr("id");
    if (terminalCommands.hasOwnProperty(userCommand)) {
      executeTerminalCommand(userCommand);
    } else {
      let commandInvalidResult = `<p>Invalid Command: <span class="text-danger">${userCommand}</span></p>`;
      terminalCommandOutput(commandInvalidResult, terminalHelpText);
    }
  }
});

$(document).on("keypress", "#userName", function (e) {
  let name = $(this).val();
  let userInfo = {
    name,
  };
  var keycode = e.keyCode ? e.keyCode : e.which;
  if (keycode == 13) {
    $(this).removeAttr("autofocus").prop("readonly", true);
    $(this).removeAttr("id");
    storeUserInfo(userInfo);
    let result = `<p class="terminalCommandHelp ml-10">Your name is <strong>${name}</strong></p>`;
    executeTerminalCommand(result);
  }
});

$(document).on("click", "#terminalBox .wb-body", function () {
  document.querySelector("#userCommand").focus();
});

const getCurrentLocation = () => {
  navigator.geolocation.getCurrentPosition(showPosition, showError, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });
};

function showPosition(position) {
  var lati = position.coords.latitude;
  var long = position.coords.longitude;
  let result = `<p class="ml-10">Your Location!<br />
                  <span class="text-info">Latitude:</span> ${lati}<br />
                  <span class="text-info">Longitude:</span> ${long}<br />
                  <span class="text-info">Accuracy:</span> ${position.coords.accuracy} meters!
                </p>`;
  result += terminalMapSection;
  let terminalMap = $("#terminalMapSection");
  if (terminalMap) terminalMap.remove();
  terminalCommandOutput(result);
  initMap(lati, long);
}

function showError(error) {
  let result = `<p class="text-danger ml-10">There was an error.<br />
                  ERROR ${error.code}: ${error.message}
                </p>`;
  terminalCommandOutput(result);
}

function terminalCommandOutput(commandResult, terminalHelpText) {
  if (commandResult) {
    $("#terminalContent").append(commandResult);
    $("#terminalContent").append(terminalHelpText);
    $("#terminalContent").append(nextTerminalLine);
  } else $("#terminalContent").html(nextTerminalLine);
  document.querySelector("#userCommand").focus();
}

function executeFunction(functionName, context) {
  return context[functionName].apply(context);
}

function executeTerminalCommand(command) {
  if (command == "exit") $(".wb-close").trigger("click");
  executeFunction(command, terminalCommands);
}
