function operate(operator, a, b) {
    switch(operator){
        case 'plus':
            return a+b;
            break;
        case 'minus':
            return a-b;
            break;
        case 'multiply':
            return a*b;
            break;
        case 'divide':
            return a/b;
            break;
        default:
            return;
    }
}

function updateDisplay() {
    let display = document.querySelector('.current-operand');
    let newValue = displayValue === "" ? "" : Math.round(parseFloat(displayValue)*100)/100;
    display.textContent = newValue;
}

function updateStore() {
    let store = document.querySelector('.previous-operand');
    let newStore = storeValue_one === "" ? "" : Math.round(parseFloat(storeValue_one)*100)/100;
    let newStore_two = storeValue_two === "" ? "" : Math.round(parseFloat(storeValue_two)*100)/100;
    let symbol;
    switch(storeOperator) {
        case 'plus':
            symbol = "+";
            break;
        case 'minus':
            symbol = "-";
            break;
        case 'multiply':
            symbol = "x";
            break;
        case 'divide':
            symbol = "÷";
            break;
    }
    if(storeValue_two) {
        store.textContent = `${newStore} ${symbol} ${newStore_two} = `;
    }
    else if (!storeValue_one) store.textContent = "";
    else {
        store.textContent = `${newStore} ${symbol}`;
    }
}

function clear(){
    if(storeValue_two) return;
    displayValue = displayValue.slice(0,-1);
    updateDisplay();
}

function clearAll() {
    displayValue = "";
    storeValue_one = "";
    storeValue_two = "";
    storeOperator = "";
    updateDisplay();
    updateStore();
}

function toggleNeg() {
    if(displayValue[0] === '-') displayValue = displayValue.slice(1);
    else if(displayValue != "") displayValue = '-' + displayValue;
    else return;
    updateDisplay();
}

function equals() {
    if(!displayValue || !storeValue_one) return;
    if(storeValue_two) return;
    storeValue_two = displayValue;
    displayValue = operate(storeOperator,parseFloat(storeValue_one),parseFloat(displayValue));
    updateDisplay();
    updateStore();
    acceptInput = false;
}

let displayValue;
let storeValue_one, storeValue_two;
let storeOperator;

const numbers = document.querySelectorAll("[data-number]");
const clr = document.querySelector("[data-display='clear'");
const clrAll = document.querySelector("[data-display='clear all'");
const neg = document.querySelector("[data-display=negative]");
const operators = document.querySelectorAll("[data-operator]");
const eql = document.querySelector("[data-equals]");

numbers.forEach(number => {
    number.addEventListener('click', e => {
        if(!displayValue) displayValue = e.target.dataset.number;
        else displayValue += e.target.dataset.number;
        updateDisplay(displayValue);
    });
});

operators.forEach(operator => {
    operator.addEventListener('click', e => {
        if(displayValue) {
            if(storeValue_one && !storeValue_two) {
                equals();
            }
            else if(storeValue_two) {
                storeValue_one = displayValue;
                storeValue_two = "";
                displayValue = "";
                storeOperator = e.target.dataset.operator;
                updateDisplay();
                updateStore();
            }
            else {
                storeValue_one = displayValue;
                storeOperator = e.target.dataset.operator;
                displayValue = "";
            }
            updateDisplay();
            updateStore();
        }
    })
})

clr.addEventListener('click',clear);
clrAll.addEventListener('click', clearAll);
neg.addEventListener('click', toggleNeg);
eql.addEventListener('click', equals);