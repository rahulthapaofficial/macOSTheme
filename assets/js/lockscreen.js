var lastLogin = "";
var i = 0;
$(function () {
  $("#unlockBtn").click(function () {
    let userPassword = $("#password").val();
    if (checkPassword(userPassword)) unlockScreen();
  });

  $("#password").keyup(function (event) {
    let userPassword = $(this).val();
    if (userPassword.length === 4) {
      if (checkPassword(userPassword)) unlockScreen();
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

function unlockScreen() {
  lastLogin = `${new Date($.now())}`;
  localStorage.setItem("lastLogin", lastLogin);
  $("#lockscreenContainer").slideUp();
}
