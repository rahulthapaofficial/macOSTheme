$(function () {
  $("#unlockBtn").click(function () {
    $("#lockscreenContainer").slideUp();
  });

  $("#lockBtn").click(function () {
    $("#lockscreenContainer").slideDown();
  });
});
