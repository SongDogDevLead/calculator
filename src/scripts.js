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
addEventListener(load, autoSize())
function autoSize(){

const useVH = window.innerHeight < window.innerWidth;
let dim = 48 + (useVH ? 'vh' : 'vw');
const calcBody = document.querySelector('.calcBody')
    calcBody.style.height = dim;
    calcBody.style.width = dim;
}