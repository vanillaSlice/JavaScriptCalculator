window.addEventListener('load', function () {

  'use strict';

  var display = document.getElementById('display');
  var inputs = ['0'];

  document.getElementById('ac').addEventListener('click', clearAll);

  function clearAll() {
    resetInputs();
    displayInputs();
  }

  function resetInputs() {
    inputs = ['0'];
  }

  function displayInputs() {
    display.innerText = inputs.join('');
  }

  document.getElementById('ce').addEventListener('click', clearEntry);

  function clearEntry() {
    if (hasMoreThanOneInput()) {
      removeLastInput();
      displayInputs();
    } else {
      clearAll();
    }
  }

  function hasMoreThanOneInput() {
    return inputs.length > 1;
  }

  function removeLastInput() {
    inputs.pop();
  }

  var numberButtons = document.getElementsByClassName('number');
  for (var i = 0, length = numberButtons.length; i < length; i++) {
    numberButtons.item(i).addEventListener('click', appendNumber);
  }

  function appendNumber() {
    var number = this.innerText;
    var last = getLastInput();
    if (isAnOperation(last)) {
      inputs.push(number);
    } else if (last === '0') {
      setLastInput(number);
    } else {
      appendToLastInput(number);
    }
    displayInputs();
  }

  function getLastInput() {
    return inputs[inputs.length - 1];
  }

  function isAnOperation(value) {
    return value === '÷' || value === '×' || value === '+' || value === '−';
  }

  function setLastInput(value) {
    inputs[inputs.length - 1] = value;
  }

  function appendToLastInput(value) {
    inputs[inputs.length - 1] += value;
  }

  var operationButtons = document.getElementsByClassName('operation');
  for (i = 0, length = operationButtons.length; i < length; i++) {
    operationButtons.item(i).addEventListener('click', appendOperation);
  }

  function appendOperation() {
    var operation = this.innerText;
    if (operation === '−') {
      appendMinus();
    } else if (!isAnOperation(getLastInput())) {
      inputs.push(operation);
    }
    displayInputs();
  }

  function appendMinus() {
    var last = getLastInput();
    if (last === '0' && !hasMoreThanOneInput()) {
      inputs[0] = '−';
    } else if (last !== '−') {
      inputs.push('−');
    }
  }

  document.getElementById('decimal-point').addEventListener('click', appendDecimalPoint);

  function appendDecimalPoint() {
    var last = getLastInput();
    if (!containsDecimalPoint(last)) {
      appendToLastInput('.');
      displayInputs();
    }
  }

  function containsDecimalPoint(value) {
    return value.indexOf('.') !== -1
  }

  document.getElementById('equals').addEventListener('click', calculateResult);

  function calculateResult() {
    var expression = normaliseInputs();
    var result = evaluate(expression);
    if (isInvalidResult(result)) {
      handleCalculationError();
    } else {
      inputs = [normaliseResult(result)];
      displayInputs();
    }
  }

  function normaliseInputs() {
    return inputs.join('').replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
  }

  function evaluate(expression) {
    try {
      return eval(expression);
    } catch (error) {
      return error;
    }
  }

  function isInvalidResult(result) {
    return isNaN(result) || result === Infinity || result === -Infinity;
  }

  function handleCalculationError() {
    display.innerText = 'Error';
    resetInputs();
  }

  function normaliseResult(result) {
    return String(result).replace(/-/g, '−');
  }

});