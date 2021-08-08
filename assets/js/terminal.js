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
    if (userCommand == ":help") {
      let terminalCommandHelp = "";
      $.each(terminalCommands, function (key, value) {
        terminalCommandHelp += `<p class="terminalCommandHelp ml-10">${key} - <span style="color: green">${value}</span></p>`;
      });
      executeTerminalCommand(terminalCommandHelp);
      return false;
    }
    if (terminalCommands.hasOwnProperty(userCommand)) {
      if (userCommand == "clear") executeTerminalCommand(false);
      else if (userCommand == "exit") $(".wb-close").trigger("click");
      else if (userCommand == "ipconfig") {
        fetch("https://api.ipify.org/?format=json")
          .then((resp) => resp.json())
          .then((ip) => {
            let publicIp = ip.ip;
            let commandResult = `<p>inet ${publicIp} netmask 255.255.255.0</p>`;
            executeTerminalCommand(commandResult);
          })
          .catch((error) => {
            let result = `<p class="text-warning ml-10">${error}</p>`;
            executeTerminalCommand(result);
          });
      } else if (userCommand == "time") {
        let currentTerminalTimeResult = new Date();
        executeTerminalCommand(currentTerminalTimeResult);
      } else if (userCommand == "whereami") getCurrentLocation();
      else if (userCommand == "whoami") {
        let storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (Object.keys(storageUserInfo).length) {
          let name = storageUserInfo.name;
          let result = `<p class="terminalCommandHelp ml-10">Your name is <strong>${name}</strong></p>`;
          executeTerminalCommand(result);
        } else {
          $("#terminalContent").append(userInfoField);
          document.querySelector("#userName").focus();
        }
      } else {
        let commandInvalidResult = `<p>Invalid Command: <span class="text-danger">${userCommand}</span></p>`;
        executeTerminalCommand(commandInvalidResult, terminalHelpText);
      }
    } else {
      let commandInvalidResult = `<p>Invalid Command: <span class="text-danger">${userCommand}</span></p>`;
      executeTerminalCommand(commandInvalidResult, terminalHelpText);
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
                  Latitude: ${lati}<br />
                  Longitude: ${long}<br />
                  Accuracy: ${position.coords.accuracy} meters!
                </p>`;
  result += terminalMapSection;
  let terminalMap = $("#terminalMapSection");
  if (terminalMap) terminalMap.remove();
  executeTerminalCommand(result);
  initMap(lati, long);
}

function showError(error) {
  let result = `<p class="text-danger ml-10">There was an error.<br />
                  ERROR ${error.code}: ${error.message}
                </p>`;
  executeTerminalCommand(result);
}

function executeTerminalCommand(commandResult, terminalHelpText) {
  if (commandResult) {
    $("#terminalContent").append(commandResult);
    $("#terminalContent").append(terminalHelpText);
    $("#terminalContent").append(nextTerminalLine);
  } else $("#terminalContent").html(nextTerminalLine);
  document.querySelector("#userCommand").focus();
}
