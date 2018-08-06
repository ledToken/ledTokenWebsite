$("#contactForm")
  .validator()
  .on("submit", function(event) {
    console.log("here yo");
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
      formError();
      submitMSG(false, "Did you fill in the form properly?");
    } else {
      // everything looks good!
      event.preventDefault();
      submitForm();
    }
  });

function submitForm() {
  // Initiate Variables With Form Content
  console.log("here yo");

  var name = $("#name").val();
  var email = $("#email").val();
  var msg_subject = $("#msg_subject").val();
  var message = $("#message").val();

  $.ajax({
    type: "POST",
    url: "assets/php/form-process.php",
    data:
      "name=" +
      name +
      "&email=" +
      email +
      "&msg_subject=" +
      msg_subject +
      "&message=" +
      message,
    success: function(text) {
      if (text == "success") {
        formSuccess();
      } else {
        formError();
        submitMSG(false, text);
      }
    }
  });
}

function formSuccess() {
  console.log("here yo");

  $("#contactForm")[0].reset();
  submitMSG(true, "Message Submitted!");
}

function formError() {
  //$("#contactForm").removeClass().addClass('shake animated-').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  //    $(this).removeClass();
  //});
}

function submitMSG(valid, msg) {
  console.log("here yo");

  if (valid) {
    var msgClasses = "h5 text-center tada- animated- text-success";
  } else {
    var msgClasses = "h5 text-center text-danger";
  }
  $("#msgSubmit")
    .removeClass()
    .addClass(msgClasses)
    .text(msg);
}
