
const calForm = document.querySelector(".calculator"),
printVal = calForm.querySelector(".result"),
printOper = calForm.querySelector(".curOper"),
printRecord = calForm.querySelector(".record");

let result = 0;
let currentNumber = 0;
let currentOperator = "";
let type = 0;
let record = "";

function makeInit() {
result = 0;
currentNumber = 0;
currentOperator = "";
type = 0;
record = "";
printRecord.innerText = "";
}

function print(value) {
printVal.innerText = value;
}

function handleInput(event) {
const className = event.target.getAttribute("class");
if (className.indexOf("number") !== -1) {
  calculate(event.target.value, 0);
} else if (className.indexOf("operator") !== -1) {
  calculate(event.target.value, 1);
}
console.log(result, currentNumber, currentOperator, type, record);
}

function makeResult(value) {
if (value === "=") {
  if (currentOperator !== "") {
    result = operatorListener(currentOperator, result, currentNumber);
  } else {
    result = parseFloat(currentNumber);
  }
  if (currentOperator === "*" || currentOperator === "/") {
    record =
      "(" + record + ")" + currentOperator + parseInt(currentNumber, 10);
  } else {
    record = record + currentOperator + parseInt(currentNumber, 10);
  }
  printRecord.innerText = record;
} else if (value === "C") {
  makeInit();
}
print(parseFloat(result));
}

function calculate(value, input) {
if (input === 0) {
  if (input === type) {
    currentNumber = currentNumber + value;
    print(parseFloat(currentNumber));
  } else {
    if (result === 0) {
      result = parseFloat(currentNumber);
    }
    currentNumber = 0;
    currentNumber = currentNumber + value;
    print(parseFloat(currentNumber));
  }
  printOper.innerText = "";
} else {
  if (value === "=" || value === "C") {
    makeResult(value);
  } else if (input === type) {
    currentOperator = value;
  } else {
    if (currentOperator !== "") {
      result = operatorListener(currentOperator, result, currentNumber);
      if (currentOperator === "*" || currentOperator === "/") {
        record =
          "(" + record + ")" + currentOperator + parseInt(currentNumber, 10);
      } else {
        record = record + currentOperator + parseInt(currentNumber, 10);
      }
      print(parseFloat(result));
      printRecord.innerText = record;
    } else {
      record = parseInt(currentNumber, 10);
    }
    currentOperator = value;
  }
  printOper.innerText = currentOperator;
}
type = input;
}

function operatorListener(oper, val1, val2) {
if (oper === "+") {
  return parseFloat(val1) + parseFloat(val2);
} else if (oper === "-") {
  return parseFloat(val1) - parseFloat(val2);
} else if (oper === "*") {
  return parseFloat(val1) * parseFloat(val2);
} else if (oper === "/") {
  return parseFloat(val1) / parseFloat(val2);
}
}

function init() {
calForm.addEventListener("click", handleInput);
}

init();
