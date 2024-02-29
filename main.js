let currentInput = '';
let previousInput = '';
let Operation = '';

// Gets buttons from HTML
const previousResults = document.querySelector(".previousinput");
const currentResults = document.querySelector(".currentinput");
const operationButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector('.equals');
const AC = document.querySelector('.clear');
const del = document.querySelector('.delete');
const numButtons = document.querySelectorAll(".number");
const clearAll = document.querySelector('.Clear');

//functions for the operative buttons 
function clear() {
// reset to = ''
    currentInput = '';
    previousInput = '';
    // undefined because theres no variable being selected 
    Operation = undefined;
}

function delNum() {
    //converts to a string from the number so it can be deleted. 
    currentInput = currentInput.toString().slice(0, -1);
}

// function appends number onto the display which updates the display message
function appendnum(number) {
    // if statement will only allow 1 decimal to be inputted from either variable
    if (number === '.' && currentInput.includes('.')) return;
    currentInput = currentInput.toString() + number.toString();
}

//function for operation buttons (+ - * / )
function appendOperation(operation) {
    // if one operation button is inputted it will not let you input another one until the functions done.
    if (currentInput === '') return;
    //if previous input doesnt equal an empty string call the operating function. 
    if (previousInput !== '') {
        operate();
    }
    //assigns operating parameter to the Operation variable
    Operation = operation;
    previousInput = currentInput;
    // empty because it clears out the current input when performing an operation 
    currentInput = '';
}

// Operate takes numbers and calls one of the functions of the number. 
function operate() {
    let operateNums;
    const previousNum = parseFloat(previousInput);
    const currentNum = parseFloat(currentInput);
    //If statement doesnt allow anything to happen when pressing equals if nothing is inputted.
    //isNaN is a function that shows if the value is Nan, if its NaN the function will not operate until something is inputted.
    if (isNaN(previousNum) || isNaN(currentNum)) return;
    //basically performs if and else statements using cases when a operation (*, +, -, /) is performed.
    switch(Operation) {
        // break makes sure nothing else is executed after the task is done.
        case '÷':
            operateNums = previousNum / currentNum;
            break
        case '*':
            operateNums = previousNum * currentNum;
            break
        case '+':
            operateNums = previousNum + currentNum;
            break
        case '-':
            operateNums = previousNum - currentNum;
            break
        case '%':
            operateNums = previousNum % currentNum;
            break
            //default means else and for default just do nothing unless a function is being performed.
        default:
            return;
    }
    //value or answer for operateNums will be the current input on display
    currentInput = operateNums;
    //not being selected so dont need it to be there.
    Operation = undefined;
    // keeps previous value off from screen when = is pressed and gives the answer.
    previousInput = '';

    if (currentInput === Infinity) {
        window.alert('Anything divisible by zero will result in your termination..');
        currentInput = '';
        return;
    }
}

// Function updates the display

function updateCalc() {
    currentResults.innerText = currentInput;
    //puts full function and display of previous input on
    if (Operation != null) {
        previousResults.innerText = `${previousInput} ${Operation}`;
    }
}


// event listener that listens to a button being pressed
// when button is pressed it will update to the screen. 

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendnum(button.innerText);
        updateCalc();
    });
});

//event listener for when the clear button is pressed. 
clearAll.addEventListener('click', () => {
    clear();
    updateCalc();
});

//event listener for when the del button is pressed. 
del.addEventListener('click', () => {
    delNum();
    updateCalc();
});

//event listener for when you click an operation 
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendOperation(button.innerText);
        updateCalc();
    });
});

//event listener for when you call the equals button 
equalButton.addEventListener('click', () => {
    operate();
    updateCalc();
})
