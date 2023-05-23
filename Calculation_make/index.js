let currentResult = ""; // Variable to hold the current calculation result

// Append a number to the current result
function appendNumber(number) {
  currentResult += number;
  updateDisplay();
}

// Add an operator to the current result
function addOperator(operator) {
  currentResult += operator;
  updateDisplay();
}

// Calculate the result and update the display
function calculateResult() {
  try {
    const result = eval(currentResult);
    currentResult = result.toString();
    updateDisplay();
  } catch (error) {
    currentResult = "Error";
    updateDisplay();
  }
}

// Clear the current result
function clearResult() {
  currentResult = "";
  updateDisplay();
}

// Update the display with the current result
function updateDisplay() {
  const resultElement = document.getElementById("result");
  resultElement.value = currentResult;
}
