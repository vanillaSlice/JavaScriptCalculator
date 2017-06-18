window.onload = function () {

  "use strict";

  var screen = document.getElementById("screen");
  var result = document.getElementById("result");
  var history = document.getElementById("history");

  if (result.scrollWidth > screen.clientWidth) {
    result.innerText = "Digit Limit Met";
  }
  if (history.scrollWidth > screen.clientWidth) {
    history.innerText = "Digit Limit Met";
  }

};