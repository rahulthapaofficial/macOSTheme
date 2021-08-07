$(function () {
  $(".dockerApps").click(function (e) {
    $(this).addClass("bounce");
    this.offsetWidth = this.offsetWidth;
    setTimeout(function () {
      $(".dockerApps").removeClass("bounce");
    }, 800);
  });

  $("#terminalApp").click(function () {
    if ($("#terminalBox").css("display") == "none") {
      $(this).find("p").addClass("active");
      $("#terminalBox").css({
        display: "block",
      });
      let firstTerminalLine = `<p>Last Login:<span id="terminalLastLoginDetails" class="ml-5"></span></p>`;
      $("#terminalContent").html(firstTerminalLine);
      i = 0;
      terminalTypeWriter();
    }
  });
});

function terminalTypeWriter() {
  if (i < lastLogin.length) {
    $("#terminalLastLoginDetails").append(lastLogin[i]);
    i++;
    setTimeout(terminalTypeWriter, 30);
  } else {
    let terminalHelpText =
      "<p style='color: #168dcc'>Use :help to show macOS commands</p>";
    $("#terminalContent").append(terminalHelpText);
    let nextLine = `<p>rahulthapa@macOS:~<input type="text" class="terminalCommandInput ml-5" autofocus autocomplete="off"></p>`;
    $("#terminalContent").append(nextLine);
  }
}
