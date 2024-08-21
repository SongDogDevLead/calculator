// probably the easiest way i can think of to process this
// is to create a string that then converts to an array
//this array will be seperated into values using spaces
// this will work by allowing number buttons to input a single 
// digit into the string but operators add ' + ' for example
// this should allow the string to break up the data correctly 
// for future use. eg string = '1 + 1' becomes arr = 1,+,1
// then we can build an operation taking arr[1] comparing it 
// to the operators available using switch-case to build the 
// operation and return the result.

//set up auto sizing for display
body.addEventListener(load, autoSize())
function autoSize(){

const useVH = window.innerHeight < window.innerWidth;
let dim = 48 + (useVH ? 'vh' : 'vw');
const calcBody = document.querySelector('.calcBody')
    calcBody.style.height = dim;
    calcBody.style.width = dim;
}

//declare global variables
let display = document.querySelector('.display');
//create operators conversion object
const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
};
//create the object to update as inputs occur
let processVariables = {
    firstNumber: 0,
    operator: 'null',
    lastNumber: 0
}
// create the output variable
let result = undefined


//set event listener for buttons
const numberButton = document.querySelectorAll('.number')
numberButton.forEach(button => {
button.addEventListener('click', valueEnter)
})

const operatorButton = document.querySelectorAll('.operator')
operatorButton.forEach(button => {
button.addEventListener('click', addOperator)
})

const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', clearProcess)

const posNegButton = document.querySelector('#pos-neg')
posNegButton.addEventListener('click', invertPolarity)

const percentButton = document.querySelector('#percent')
posNegButton.addEventListener('click', convertToPercent)

const decimalButton

const equalsButton = document.querySelector('#equals')
equalsButton.addEventListener('click', solveProcess)

//set number button to update display text and 
//modify currentProcess to prepare for operations
function valueEnter(){
    let number = parseInt(button.textContent)
    if(processVariables.firstNumber == 0 && processVariables.operator == 'null'){
        display.textContent = number
        processVariables.firstNumber = number
    }
    else if(processVariables.operator == 'null'){
        display.textContent += number
        processVariables.firstNumber += number
    }
    else if(processVariables.lastNumber == 0){
        display.textContent = number
        processVariables.lastNumber = number
    }
    else {
        display.textContent += number
        processVariables.lastNumber += number
    }
}
function addOperator(){
    let operator = button.textContent
    processVariables.operator = operator
}

function clearProcess(){
    display.textContent = 0
    processVariables = {
        firstNumber: 0,
        operator: 'null',
        lastNumber: 0
    }
}

function invertPolarity(){
    if(processVariable.firstNumber != 0 && processVariable.operator == 'null'){
        processVariable.firstNumber = -processVariable.firstNumber
        display.textContent = processVariable.firstNumber
    }
    else if(processVariable.lastNumber != 0){
        processVariable.lastNumber = -processVariable.lastNumber
        display.textContent = processVariable.lastNumber
    }
}

function convertToPercent(){
    if(processVariable.firstNumber != 0 && processVariable.operator == 'null'){
        processVariable.firstNumber = processVariable.firstNumber/100
        display.textContent = processVariable.firstNumber
    }
    else if(processVariable.lastNumber != 0){
        processVariable.lastNumber = processVariable.lastNumber/100
        display.textContent = processVariable.lastNumber
    }
}

function solveProcess(){
    // calculate the results
    result = operators[processVariables.operator](processVariables.firstNumber, processVariables.lastNumber);
    display.textContent = result
    result = undefined
}