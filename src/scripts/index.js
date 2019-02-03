let inputs = ['0'];

/*
 * DOM Elements
 */

const screenTextElement = document.querySelector('.screen-text');
const acBtnElement = document.querySelector('#ac');
const ceBtnElement = document.querySelector('#ce');
const numberBtnElements = [].slice.call(document.querySelectorAll('.number.btn'));
const operationBtnElements = [].slice.call(document.querySelectorAll('.operation.btn'));
const decimalPointBtnElement = document.querySelector('#decimal-point');
const equalsBtnElement = document.querySelector('#equals');

function resetInputs() {
  inputs = ['0'];
}

function displayInputs() {
  screenTextElement.innerText = inputs.join('');
}

function clearAll() {
  resetInputs();
  displayInputs();
}

acBtnElement.addEventListener('click', clearAll);

function hasMoreThanOneInput() {
  return inputs.length > 1;
}

function removeLastInput() {
  inputs.pop();
}

function clearEntry() {
  if (hasMoreThanOneInput()) {
    removeLastInput();
    displayInputs();
  } else {
    clearAll();
  }
}

ceBtnElement.addEventListener('click', clearEntry);

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

function appendNumber() {
  const number = this.innerText;
  const last = getLastInput();
  if (isAnOperation(last)) {
    inputs.push(number);
  } else if (last === '0') {
    setLastInput(number);
  } else {
    appendToLastInput(number);
  }
  displayInputs();
}

numberBtnElements.forEach((btn) => {
  btn.addEventListener('click', appendNumber);
});

function appendMinus() {
  const last = getLastInput();
  if (last === '0' && !hasMoreThanOneInput()) {
    inputs[0] = '−';
  } else if (last !== '−') {
    inputs.push('−');
  }
}

function appendOperation() {
  const operation = this.innerText;
  if (operation === '−') {
    appendMinus();
  } else if (!isAnOperation(getLastInput())) {
    inputs.push(operation);
  }
  displayInputs();
}

operationBtnElements.forEach((btn) => {
  btn.addEventListener('click', appendOperation);
});

function containsDecimalPoint(value) {
  return value.indexOf('.') !== -1;
}

function appendDecimalPoint() {
  const last = getLastInput();
  if (!containsDecimalPoint(last)) {
    appendToLastInput('.');
    displayInputs();
  }
}

decimalPointBtnElement.addEventListener('click', appendDecimalPoint);

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
  return !Number.isFinite(result);
}

function handleCalculationError() {
  screenTextElement.innerText = 'Error';
  resetInputs();
}

function normaliseResult(result) {
  return String(result).replace(/-/g, '−');
}

function calculateResult() {
  const expression = normaliseInputs();
  const result = evaluate(expression);
  if (isInvalidResult(result)) {
    handleCalculationError();
  } else {
    inputs = [normaliseResult(result)];
    displayInputs();
  }
}

equalsBtnElement.addEventListener('click', calculateResult);
