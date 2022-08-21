const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "/": (a, b) => a / b,
  "*": (a, b) => a * b,
};

const operate = (op, a, b) => op(+a, +b);

var numA = "";
var numB = "";
var curOp = "";

function updateDisplay() {
  if (numA !== "") {
    $("#display").textContent = numA;
  } else {
    $("#display").textContent = numB;
  }
}

updateDisplay();

$$("#numpad button").forEach((button) =>
  button.addEventListener("click", (e) => {
    let value = e.target.getAttribute("key-value");
    // TODO: check valid char add
    // EX: can't add 0 if already just 0
    // Can't add multiple decimals
    numA += value;
  })
);

$$("#operations button").forEach((button) =>
  button.addEventListener("click", (e) => {
    // Operation buttons shouldn't do anything
    // If there's nothing to operate on
    let value = e.target.getAttribute("key-value");

    if (numB !== "" && numA !== "" && curOp !== "") {
      numB = operate(operations[curOp], numB, numA);
      numA = "";
      curOp = value;
    } else if (numA !== "" && curOp === "") {
      numB = numA;
      numA = "";
      curOp = value;
    }
  })
);

$("#op-equals").addEventListener("click", (e) => {
  if (numB !== "" && numA !== "" && curOp !== "") {
    numB = operate(operations[curOp], numB, numA);
    numA = "";
    curOp = "";
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

// numA
// numB
// operation

// clicking on numpad always adds numbers to numA

// clicking on any operation while operation, numB is empty and numA is filled
// shifts numA into numB, and fills operation

// clicking on any operation while numA, numB, and operation is filled
// will force calculation and put result into numB, and overwrite prev operation

// `=` forces calculation if numA, numB, and operation are filled
// clears operation

// Display will show number from numA unless empty, in which it will try numB
// We want the current number to still be displayed when numA gets shifted into numB by an operation
