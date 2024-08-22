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

//declare global variables
let display = document.querySelector('.display');
//create operators conversion object

//create the object to update as inputs occur
let processVariables = {
    firstNumber: '0',
    operator: 'null',
    lastNumber: '0'
};
// create the output variable
let result = undefined;


//set event listener for buttons
const numberButton = document.querySelectorAll('.number');
numberButton.forEach(button => {
button.addEventListener('click', valueEnter);
});

const operatorButton = document.querySelectorAll('.operator');
operatorButton.forEach(button => {
button.addEventListener('click', addOperator);
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearProcess);

const posNegButton = document.querySelector('#pos-neg');
posNegButton.addEventListener('click', invertPolarity);

const percentButton = document.querySelector('#percent');
percentButton.addEventListener('click', convertToPercent);

const decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', addDecimal);

const equalsButton = document.querySelector('#equals');
equalsButton.addEventListener('click', solveProcess);

//set number button to update display text and 
//modify currentProcess to prepare for operations
function valueEnter(){
    let number = this.textContent;
    console.log(`Button clicked: ${number}`);
    console.log(`Before: firstNumber = ${processVariables.firstNumber}, 
        lastNumber = ${processVariables.lastNumber}, display = ${display.textContent},
       operator =  ${processVariables.operator} `);

    if(processVariables.firstNumber === '0' && processVariables.operator === 'null'){
        display.textContent = number;
        processVariables.firstNumber = number;
    }
    else if(processVariables.firstNumber === `${result}` && processVariables.operator === 'null'){
        display.textContent = number;
        processVariables.firstNumber = number;
    }
    else if(processVariables.operator === 'null'){
        display.textContent += number;
        processVariables.firstNumber += number;
    }
    else if(processVariables.lastNumber === '0'){
        display.textContent = number;
        processVariables.lastNumber = number;
    }
    else {
        display.textContent += number;
        processVariables.lastNumber += number;
    }
    console.log(`After: firstNumber = ${processVariables.firstNumber}, 
        lastNumber = ${processVariables.lastNumber}, display = ${display.textContent}
        operator =  ${processVariables.operator}`);
};

//set operator button to do the same as numbers esentially
function addOperator(){
    let operator = this.textContent;
    processVariables.operator = operator;
    display.textContent = `${processVariables.firstNumber} ${processVariables.operator}`;
};

//set clear to reset environment
function clearProcess(){
    display.textContent = '0';
    processVariables = {
        firstNumber: '0',
        operator: 'null',
        lastNumber: '0'
    }
};

//set -/+ to invert the value's positivity
function invertPolarity(){
   let tempFirstNumber = parseFloat(processVariables.firstNumber)
   let tempLastNumber = parseFloat(processVariables.lastNumber)
    if(tempFirstNumber != 0 && processVariables.operator === 'null'){
       tempFirstNumber = -tempFirstNumber;
        processVariables.firstNumber = `${tempFirstNumber}`
        display.textContent = processVariables.firstNumber;
    }
    else if(tempLastNumber != 0){
       tempLastNumber =-tempLastNumber;
        processVariables.lastNumber = `${tempLastNumber}`
        display.textContent = processVariables.lastNumber;
    }
};

//set % to convert to a percentage
function convertToPercent(){
    let tempFirstNumber = parseFloat(processVariables.firstNumber)
    let tempLastNumber = parseFloat(processVariables.lastNumber)
    if(tempFirstNumber != 0 && processVariables.operator === 'null'){
        tempFirstNumber = tempFirstNumber/100;
        processVariables.firstNumber = `${tempFirstNumber}`
        display.textContent = processVariables.firstNumber;
    }
    else if(tempLastNumber != 0 && !processVariables.lastNumber.includes('.')){
        tempLastNumber = tempLastNumber/100;
        processVariables.lastNumber = `${tempLastNumber}`;
        display.textContent = processVariables.lastNumber;
    }
};

//set . to add a . if there isnt one in the current number
function addDecimal(){
    console.log(`Before decimal: firstNumber = ${processVariables.firstNumber}, lastNumber = ${processVariables.lastNumber}`);
    if(processVariables.firstNumber === `${result}` && processVariables.operator === 'null'){
        processVariables.firstNumber = '0.'
        display.textContent = processVariables.firstNumber
    } 
    else if(!processVariables.firstNumber.includes('.') && processVariables.operator === 'null'){
        processVariables.firstNumber += '.'; 
        display.textContent = processVariables.firstNumber;
    }
    else if(!processVariables.lastNumber.includes('.') && processVariables.operator != 'null'){
        processVariables.lastNumber += '.'; 
        display.textContent = processVariables.lastNumber;
    }
    console.log(`After decimal: firstNumber = ${processVariables.firstNumber}, lastNumber = ${processVariables.lastNumber}`);
};
 console.log(`parse test: parseFloat(processVariables.firstNumber) = ${parseFloat(processVariables.firstNumber)}`)
//resolve the process stored in processVariables

function solveProcess(){
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };
    let tempFirstNumber = parseFloat(processVariables.firstNumber);
    let tempLastNumber = parseFloat(processVariables.lastNumber);
   
    console.log(`Before solve: tempFirstNumber = ${tempFirstNumber}, lastNumber = ${tempLastNumber}`)
    // calculate the results
    if( tempLastNumber != 0){
    result = operators[processVariables.operator](tempFirstNumber,  tempLastNumber);
    }
    else{result = 'Nope!'}
    console.log(`result after solve: ${result}`)
    display.textContent = result;
    processVariables.firstNumber = `${result}`;
    processVariables.operator = 'null';
    processVariables.lastNumber = '0';
};

