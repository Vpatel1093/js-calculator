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

function calculator() {
  var operand1 = '';
  var operator = '';
  var operand2 = '';
  var displayText = $('#display');
  var currentNumber = '';
  var lastKeyPressed = '';

  $('.button').on('mousedown touchstart', function pressKey() {
    $(this).toggleClass('press');
  });

  $('.button').on('mouseup touchend', function depressKey() {
    $(this).toggleClass('press');
  });

  $('.button').on('click', function() {
    var keyPressed = $(this).text();

    if (isNumber(keyPressed) && !irrelevantZero(keyPressed, currentNumber)) {
      currentNumber += keyPressed;
      // Remove leading 0 if applicable
      currentNumber = removeLeadingZero(currentNumber);
      displayText.text(currentNumber);
    } else if (isOperator(lastKeyPressed) && isOperator(keyPressed)) {
      // Replace current operator if existing
      operator = keyPressed;
    } else {
      switch(keyPressed) {
        case '.':
          if (allowDecimal(currentNumber)) {
            currentNumber += keyPressed;
            displayText.text(currentNumber);
          };
          break;
        case '+':
          operand1 = (currentNumber !== null) ? currentNumber : 0;
          operator = keyPressed;
          displayText.text(operator);
          break;
        case '-':
          operand1 = (currentNumber !== null) ? currentNumber : 0;
          operator = keyPressed;
          displayText.text(operator);
          break;
        case '/':
          operand1 = (currentNumber !== null) ? currentNumber : 0;
          operator = keyPressed;
          displayText.text(operator);
          break;
        case '*':
          operand1 = (currentNumber !== null) ? currentNumber : 0;
          operator = keyPressed;
          displayText.text(operator);
          break;
        case 'C':
          operand1 = '';
          operator = '';
          operand2 = '';
          displayText.text('0');
          currentNumber = '';
          lastKeyPressed = '';
          break;
      };
    };
    lastKeyPressed = keyPressed;
  });
};

$(document).ready(calculator);
