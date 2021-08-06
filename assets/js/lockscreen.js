$(function () {
  $("#unlockBtn").click(function () {
    let userPassword = $("#password").val();
    if (checkPassword(userPassword)) $("#lockscreenContainer").slideUp();
  });

  $("#password").keyup(function (event) {
    let userPassword = $(this).val();
    if (userPassword.length === 4) {
      if (checkPassword(userPassword)) $("#lockscreenContainer").slideUp();
      else $(this).val("");
    } else if (userPassword.length > 4) $(this).val("");
  });

  $("#lockBtn").click(function () {
    $("#lockscreenContainer").slideDown();
  });
});

function checkPassword(password) {
  let currentTime = $("#liveLockScreenTime").text();
  let systemPassword = currentTime.replace(":", "");
  if (systemPassword === password) {
    setTimeout(function () {
      $("#password").val("");
    }, 2000);
    return true;
  } else return false;
}
