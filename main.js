window.addEventListener('load', function () {

  'use strict';

  var display = document.getElementById('display');
  var input = ['0'];

  document.getElementById('ac').addEventListener('click', allCancel);

  function allCancel() {
    input = ['0'];
    updateDisplay();
  }

  function updateDisplay() {
    display.innerText = input.join('');
  }

  document.getElementById('ce').addEventListener('click', clearEntry);

  function clearEntry() {
    if (hasMoreThanOneInput()) {
      input.pop();
      updateDisplay();
    } else {
      allCancel();
    }
  }

  function hasMoreThanOneInput() {
    return input.length > 1;
  }

  var numberButtons = document.getElementsByClassName('number');
  for (var i = 0, length = numberButtons.length; i < length; i++) {
    numberButtons.item(i).addEventListener('click', appendNumberToDisplay);
  }

  function appendNumberToDisplay() {
    var number = this.innerText;
    var last = input[input.length - 1];
    if (isAnOperation(last)) {
      input.push(number);
    } else if (isZero(last)) {
      input[input.length - 1] = number;
    } else {
      input[input.length - 1] += number;
    }
    updateDisplay();
  }

  function isAnOperation(value) {
    return value === '÷' || value === '×' || value === '+' || value === '−';
  }

  function isZero(value) {
    return value === '0';
  }

  var operationButtons = document.getElementsByClassName('operation');
  for (i = 0, length = operationButtons.length; i < length; i++) {
    operationButtons.item(i).addEventListener('click', appendOperationToDisplay);
  }

  function appendOperationToDisplay() {
    var operation = this.innerText;
    var last = input[input.length - 1];
    if (isMinus(operation)) {
      if (isZero(last) && !hasMoreThanOneInput()) {
        input[0] = '−';
      } else if (!isMinus(last)) {
        input.push(operation);
      }
    } else if (!isAnOperation(last)) {
      input.push(operation);
    }
    updateDisplay();
  }

  function isMinus(value) {
    return value === '−';
  }

  document.getElementById('decimal-point').addEventListener('click', function () {
    var last = input[input.length - 1];
    if (last.indexOf('.') === -1) {
      input[input.length - 1] += '.';
      updateDisplay();
    }
  });

  document.getElementById('equals').addEventListener('click', calculate);

  function calculate() {
    var normalised = input.join('').replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
    try {
      var result = String(eval(normalised)).replace(/-/g, '−');
      if (Number.isNaN(result)) {
        display.innerText = "Error";
        input = ['0'];
      } else {
        input = [result];
        updateDisplay();
      }
    } catch (error) {
      display.innerText = "Error";
      input = ['0'];
    }
  }

});