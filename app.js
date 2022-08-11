const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "*": (a, b) => a * b,
};

const operate = (op, a, b) => op(a, b);

var inputList = [];
var currentInput = "";

function pushCurrentInput() {
  if (currentInput) {
    inputList.push(+currentInput);
    currentInput = "";
  }
}

function updateDisplay() {
  $("#display").textContent = inputList.join(" ") + " " + currentInput;
}

updateDisplay();

$$("#numpad button").forEach((button) =>
  button.addEventListener("click", (e) => {
    let value = e.target.getAttribute("key-value");
    if (currentInput || inputList.length % 2 == 0) {
      currentInput += value;
    }
  })
);

$$("#operations button").forEach((button) =>
  button.addEventListener("click", (e) => {
    // Operation buttons shouldn't do anything
    // If there's nothing to operate on
    let value = e.target.getAttribute("key-value");
    pushCurrentInput();
    if (inputList.length === 3) {
      inputList = [
        operate(operations[inputList[1]], inputList[0], inputList[2]),
      ];
    }
    if (inputList.length === 1) {
      inputList.push(value);
    }
  })
);

$("#op-equals").addEventListener("click", (e) => {
  pushCurrentInput();
  if (inputList.length === 3) {
    inputList = [operate(operations[inputList[1]], inputList[0], inputList[2])];
  }
});

$("#op-clear").addEventListener("click", (e) => {
  currentInput = "";
  inputList = [];
});

$$("button").forEach((button) =>
  button.addEventListener("click", (e) => {
    updateDisplay();
  })
);

// Add chars to currentInput while numpad keys are being hit
// On click for operation: push currentInput into inputList
// And then reset currentInput

// compute value if number and operator already in inputList
