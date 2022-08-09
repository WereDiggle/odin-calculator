const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "*": (a, b) => a % b,
};

const operate = (op, a, b) => op(a, b);

var inputList = [];
var currentInput = "";

function updateDisplay() {
  $("#display").textContent = inputList.join(" ") + " " + currentInput;
}

updateDisplay();

$$("#numpad button").forEach((button) =>
  button.addEventListener("click", (e) => {
    let value = e.target.getAttribute("key-value");
    currentInput += value;
  })
);

$$("#operations button").forEach((button) =>
  button.addEventListener("click", (e) => {
    // Operation buttons shouldn't do anything
    // If there's nothing to operate on
    let value = e.target.getAttribute("key-value");
    if (currentInput) {
      inputList.push(+currentInput);
      currentInput = "";
      if (inputList.length === 3) {
        inputList = [
          operate(operations[inputList[1]], inputList[0], inputList[2]),
        ];
      }
      inputList.push(value);
    }
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

// compute value if number and operator already in inputList
