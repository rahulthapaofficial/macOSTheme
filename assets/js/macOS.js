$(function () {
  $("#terminalBox").not(".wb-header").draggable();
  $("#terminalBox").resizable();

  $(".wb-close").click(function () {
    $("#terminalBox").css("display", "none");
    $('#terminalApp').find("p").removeClass("active");
    $("#terminalContent").html("");
  });
});
