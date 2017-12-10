window.addEventListener('load', function() {

  'use strict';

  var inputs = ['0'];

  /*
   * DOM elements.
   */
  var screenTextElement = document.querySelector('.screen-text');
  var acBtnElement = document.querySelector('#ac');
  var ceBtnElement = document.querySelector('#ce');
  var numberBtnElements = [].slice.call(document.querySelectorAll('.number.btn'));
  var operationBtnElements = [].slice.call(document.querySelectorAll('.operation.btn'));
  var decimalPointBtnElement = document.querySelector('#decimal-point');
  var equalsBtnElement = document.querySelector('#equals');

  acBtnElement.addEventListener('click', clearAll);

  function clearAll() {
    resetInputs();
    displayInputs();
  }

  function resetInputs() {
    inputs = ['0'];
  }

  function displayInputs() {
    screenTextElement.innerText = inputs.join('');
  }

  ceBtnElement.addEventListener('click', clearEntry);

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

  numberBtnElements.forEach(function(btn) {
    btn.addEventListener('click', appendNumber);
  });

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

  operationBtnElements.forEach(function(btn) {
    btn.addEventListener('click', appendOperation);
  });

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

  decimalPointBtnElement.addEventListener('click', appendDecimalPoint);

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

  equalsBtnElement.addEventListener('click', calculateResult);

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
    screenTextElement.innerText = 'Error';
    resetInputs();
  }

  function normaliseResult(result) {
    return String(result).replace(/-/g, '−');
  }

});