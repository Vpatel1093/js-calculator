function isNumber(keyPressed) {
  return !isNaN(keyPressed);
};

function isOperator(keyPressed) {
  var match = keyPressed.match(/[\+\-\*\/]/);
  return match !== null;
};

function irrelevantZero(keyPressed, currentNumber) {
  return (keyPressed === '0' && currentNumber === '0');
};

function removeLeadingZero(currentNumber) {
  if (currentNumber.charAt(0) === '0' && currentNumber.length > 1) {
    return currentNumber.slice(1);
  } else {
    return currentNumber;
  };
};

function allowDecimal(currentNumber) {
  var match = currentNumber.match(/[.]/);
  return match === null;
};

function add(operand1, operand2) {
  return parsed(operand1) + parsed(operand2);
};

function subtract(operand1, operand2) {
  return parsed(operand1) - parsed(operand2);
};

function multiply(operand1, operand2) {
  return parsed(operand1) * parsed(operand2);
};

function divide(operand1, operand2) {
  return parsed(operand1) / parsed(operand2);
};

function parsed(string) {
  if (string.indexOf('.') >= 0) {
      return parseFloat(string);
  } else {
      return parseInt(string,10);
  }
};

function calculate(operand1, operand2, operator) {
  switch(operator) {
    case '+':
      currentNumber = add(operand1, operand2).toString();
      lastOperand2 = operand2;
      break;
    case '-':
      currentNumber = subtract(operand1, operand2).toString();
      lastOperand2 = operand2;
      break;
    case '/':
      currentNumber = divide(operand1, operand2).toString();
      lastOperand2 = operand2;
      break;
    case '*':
      currentNumber = multiply(operand1, operand2).toString();
      lastOperand2 = operand2;
      break;
  };
};

var operand1 = '';
var operator = '';
var operand2 = '';
var displayText = $('#display');
var lastCalculationText = $('#last-calc');
var currentNumber = '';
var lastKeyPressed = '';
var lastOperand2 = '';
var lastOperator = '';

function calculator() {
  $('.button').on('mousedown touchstart', function pressKey() {
    $(this).toggleClass('press');
  });

  $('.button').on('mouseup touchend', function depressKey() {
    $(this).toggleClass('press');
  });

  $('.button').on('click', function() {
    var keyPressed = $(this).text();

    if (isNumber(keyPressed) && !irrelevantZero(keyPressed, currentNumber)) {
      if (lastKeyPressed === '=' && !operator) { operand1 = '' };
      currentNumber += keyPressed;
      // Remove leading 0 if applicable
      currentNumber = removeLeadingZero(currentNumber);
      displayText.text(currentNumber);
    } else if (isOperator(lastKeyPressed) && isOperator(keyPressed)) {
      // Replace current operator if existing
      operator = keyPressed;
      displayText = displayText.text(operator);
    } else {
      switch(keyPressed) {
        case '.':
          if (lastKeyPressed === '=' && !operator) { operand1 = '' };
          if (allowDecimal(currentNumber)) {
            currentNumber += keyPressed;
            displayText.text(currentNumber);
          };
          break;
        case '+':
        case '-':
        case '/':
        case '*':
          if (!operand1) {
            operand1 = displayText.text();
            operator = keyPressed;
          } else if (operand1 && operator) {
            operand2 = displayText.text();
            calculate(operand1, operand2, operator)
            lastCalculationText.text(operand1 + ' ' + operator + ' ' + operand2 + ' ' + '=' + ' ' + currentNumber);
            operand1 = currentNumber;
            operand2 = '';
            operator = keyPressed;
          } else if (operand1 && !operator) {
            operator = keyPressed;
          };
          currentNumber = '';
          displayText.text(operator);
          break;
        case 'C':
          operand1 = '';
          operator = '';
          operand2 = '';
          displayText.text('0');
          lastCalculationText.text('');
          currentNumber = '';
          lastKeyPressed = '';
          keyPressed = '';
          lastOperand2 = '';
          lastOperator = '';
          break;
        case '=':
          if (operator && currentNumber) {
            operand2 = currentNumber;
          }
          if (!operand2 && lastOperand2) {
            operand2 = lastOperand2;
            operator = lastOperator
          }
          if (operand1 && operand2 && operator) {
            calculate(operand1, operand2, operator);
            displayText.text(currentNumber);
            lastCalculationText.text(operand1 + ' ' + operator + ' ' + operand2 + ' ' + '=' + ' ' + currentNumber);
            operand1 = currentNumber;
            lastOperator = operator;
            operand2 = '';
            currentNumber = '';
            operator = '';
          }
          break;
      };
    };
    lastKeyPressed = keyPressed;
  });
};

$(document).ready(calculator);
