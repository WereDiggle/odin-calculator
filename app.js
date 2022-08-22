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

// Initialize display
// Fill display with divs of class 'display-char'
// Put them into a list for access later
var displayCharNodes = [];
for (let i = 0; i < 10; i++) {
  let node = document.createElement("div");
  node.classList.add("display-char");
  $("#display-nums").appendChild(node);
  displayCharNodes.push(node);
}

function updateDisplay() {
  // Clear out previous display
  for (const node of displayCharNodes) {
    node.textContent = "*";
    node.classList.remove("active");
  }
  $("#display-star").textContent = "*";
  $("#display-star").classList.remove("active");

  // Fill in display
  let displayStr = numA || numB;
  let start = Math.max(0, displayCharNodes.length - displayStr.length);
  let end = Math.min(displayStr.length, displayCharNodes.length);
  for (let i = start; i < start + end; i++) {
    displayCharNodes[i].textContent = displayStr.charAt(i - start);
    displayCharNodes[i].classList.add("active");
  }

  // Fill operator
  if (curOp) {
    $("#display-star").textContent = curOp;
    $("#display-star").classList.add("active");
  }
}

updateDisplay();

$$(".num-button").forEach((button) =>
  button.addEventListener("click", (e) => {
    let value = e.target.getAttribute("key-value");
    // TODO: check valid char add
    // EX: can't add 0 if already just 0
    // Can't add multiple decimals
    numA += value;
  })
);

$$(".op-button").forEach((button) =>
  button.addEventListener("click", (e) => {
    // Operation buttons shouldn't do anything
    // If there's nothing to operate on
    let value = e.target.getAttribute("key-value");

    if (numB !== "" && numA !== "" && curOp !== "") {
      numB = operate(operations[curOp], numB, numA).toString();
      numA = "";
      curOp = value;
    } else if (curOp === "") {
      numB = numA || numB;
      numA = "";
      curOp = value;
    }
  })
);

$("#op-equals").addEventListener("click", (e) => {
  if (numB !== "" && numA !== "" && curOp !== "") {
    numB = operate(operations[curOp], numB, numA).toString();
    numA = "";
    curOp = "";
  }
});

$("#op-clear").addEventListener("click", (e) => {
  curOp = "";
  numA = "";
  numB = "";
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
