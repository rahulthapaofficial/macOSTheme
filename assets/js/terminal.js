const nextLine = `<p>rahulthapa@macOS:~<input type="text" class="terminalCommandInput ml-5" autocomplete="off"></p>`;
$(document).on("keypress", ".terminalCommandInput", function (e) {
  let userCommand = $(this).val();
  var keycode = e.keyCode ? e.keyCode : e.which;
  if (keycode == 13) {
    $(this).removeAttr("autofocus").prop("readonly", true);
    if (userCommand == ":help") {
      let terminalCommandHelp = "";
      $.each(terminalCommands, function (key, value) {
        terminalCommandHelp += `<p class="terminalCommandHelp">${key} - ${value}</p>`;
      });
      $("#terminalContent").append(terminalCommandHelp);
      $("#terminalContent").append(nextLine);
      return false;
    }
    if (terminalCommands.hasOwnProperty(userCommand)) {
      if (userCommand == "clear") $("#terminalContent").html(nextLine);
      if (userCommand == "exit") $(".wb-close").trigger("click");
      if (userCommand == "ipconfig") {
        fetch("https://jsonip.com", { mode: "cors" })
          .then((resp) => resp.json())
          .then((ip) => {
            let publicIp = ip.ip;
            let commandResult = `<p>inet ${publicIp} netmask 255.255.255.0</p>`;
            $("#terminalContent").append(commandResult);
            $("#terminalContent").append(nextLine);
          });
      } else if (userCommand == "time") {
        let currentTerminalTimeResult = new Date();
        $("#terminalContent").append(currentTerminalTimeResult);
        $("#terminalContent").append(nextLine);
      }
    } else {
      let commandInvalidResult = `<p>Invalid Command: <span class="text-danger">${userCommand}</span></p>`;
      $("#terminalContent").append(commandInvalidResult);
      $("#terminalContent").append(nextLine);
    }
  }
});
