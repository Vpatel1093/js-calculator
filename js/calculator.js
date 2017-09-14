function isNumber(keyPressed) {
  return !isNaN(keyPressed);
}

function irrelevantZero(keyPressed, currentNumber) {
  return (keyPressed === '0' && currentNumber === '0');
}

function removeLeadingZero(currentNumber) {
  if (currentNumber.charAt(0) === '0' && currentNumber.length > 1) {
    return currentNumber.slice(1);
  } else {
    return currentNumber;
  };
}

function calculator() {
  var operand1 = '';
  var operator = '';
  var operand2 = '';
  var currentNumber = '';
  var displayText = $('#display');

  $('.button').on('mousedown', function pressKey() {
    $(this).toggleClass('press');
  });

  $('.button').on('mouseup', function depressKey() {
    $(this).toggleClass('press');
  });

  $('.button').on('click', function() {
    var keyPressed = $(this).text();

    if (isNumber(keyPressed) && !irrelevantZero(keyPressed, currentNumber)) {
      currentNumber += keyPressed;
      // Remove leading 0 if applicable
      currentNumber = removeLeadingZero(currentNumber);
      displayText.text(currentNumber);
    };

  });
}

$(document).ready(calculator);
