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

var prevOp = "";
var prevNum = "";

// Initialize display
// Fill display with divs of class 'display-char'
// Put them into a list for access later
const displayLen = 10;
var displayCharNodes = [];
for (let i = 0; i < displayLen; i++) {
  let node = document.createElement("div");
  node.classList.add("display-char");
  $("#display-nums").appendChild(node);
  displayCharNodes.push(node);
}

function updateDisplay() {
  // Clear out previous display
  for (const node of displayCharNodes) {
    node.textContent = "8";
    node.classList.remove("active");
  }
  $("#display-star").textContent = "#";
  $("#display-star").classList.remove("active");

  // Fill in display
  let displayStr = numA || numB;
  if (isNaN(+displayStr) || displayStr.length > displayLen) {
    displayStr = "??????????";
  }
  let start = Math.max(0, displayLen - displayStr.length);
  let end = Math.min(displayStr.length, displayLen);
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
  button.addEventListener("mousedown", (e) => {
    let value = button.getAttribute("key-value");
    // Prevent leading zeros
    if (numA.length >= displayLen) return;
    if (value === "0" && numA === "0") return;
    if (value !== "0" && numA === "0") {
      numA = value;
      return;
    }
    // Can't add multiple decimals
    numA += value;
  })
);

$("#num-dot").addEventListener("mousedown", (e) => {
  if (numA.length >= displayLen) return;
  if (!numA.includes(".")) {
    if (!numA) {
      numA = "0";
    }
    numA += ".";
  }
});

function shortenNum(num) {
  num = num.replace(/0+$/, "");
  num = num.replace(/\.$/, "");
  let dotIndex = num.indexOf(".");
  if (dotIndex === -1 || dotIndex >= displayLen) {
    return Math.trunc(+num).toString();
  } else {
    return num.substr(0, displayLen).replace(/0+$/, "");
  }
}

function doCalculation(op, b, a) {
  return shortenNum(
    operate(operations[op], b, a).toLocaleString("fullwide", {
      useGrouping: false,
      minimumFractionDigits: 9,
    })
  );
}

$$(".op-button").forEach((button) =>
  button.addEventListener("mousedown", (e) => {
    // Operation buttons shouldn't do anything
    // If there's nothing to operate on
    let value = button.getAttribute("key-value");

    if (numB && numA && curOp) {
      numB = doCalculation(curOp, numB, numA);
      playPokeCry(numB);
      numA = "";
      curOp = value;
      prevNum = "";
      prevOp = "";
    } else if ((numA || numB) && curOp === "") {
      numB = numA || numB;
      numA = "";
      curOp = value;
      prevNum = "";
      prevOp = "";
    }
  })
);

function playPokeCry(num) {
  if (+num >= 1 && +num <= 649 && !num.includes(".")) {
    $("#poke-cry").src = `sounds/${num}.ogg`;
    $("#poke-cry").currentTime = 0;
    $("#poke-cry").volume = 0.2;
    $("#poke-cry").play();
  }
}

$("#op-equals").addEventListener("mousedown", (e) => {
  if (numB && numA && curOp) {
    numB = doCalculation(curOp, numB, numA);
    playPokeCry(numB);
    prevNum = numA;
    prevOp = curOp;
    numA = "";
    curOp = "";
  } else if (numB && prevNum && prevOp) {
    numB = doCalculation(prevOp, numB, prevNum);
    playPokeCry(numB);
  }
});

$("#op-clear").addEventListener("mousedown", (e) => {
  curOp = "";
  numA = "";
  numB = "";
});

$$("button").forEach((button) => {
  button.addEventListener("mousedown", (e) => {
    updateDisplay();
    $("#button-sound").currentTime = 0;
    $("#button-sound").play();
  });
});

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
