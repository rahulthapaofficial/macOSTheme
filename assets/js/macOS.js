$(function () {
  $("#terminalBox").draggable({ handle: ".wb-header" });

  $(".wb-close").click(function () {
    $("#terminalBox").css("display", "none");
    $("#terminalApp").find("p").removeClass("active");
    $("#terminalContent").html("");
    storeUserCommands([]);
  });
});
