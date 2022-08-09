const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  divide: (a, b) => a / b,
  multiply: (a, b) => a % b,
};

const operate = (op, a, b) => op(a, b);

var inputList = [];
var currentInput = "";

function updateDisplay() {
  $("#display").textContent = currentInput;
}

updateDisplay();

$$("#numpad button").forEach((button) =>
  button.addEventListener("click", (e) => {
    let value = e.target.getAttribute("key-value");
    currentInput += value;
  })
);

$$("button").forEach((button) =>
  button.addEventListener("click", (e) => {
    updateDisplay();
  })
);

// Add chars to currentInput while numpad keys are being hit
// On click for operation: push currentInput into inputList
// And then reset currentInput
