function calculateResult(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x': // Updated to handle 'x' instead of '*'
            return a * b;
        case '÷':
            return a / b;
        default:
            return 'Error: invalid operator';
    }
}

let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;

function updateScreen() {
    const screen = document.querySelector('#screen');
    screen.textContent = displayValue;
}

function appendNumber(number) {
    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateScreen();
}

function clearScreen() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    updateScreen();
}

function handleOperator(operator) {
    if (currentOperator && firstOperand !== null) {
        secondOperand = parseFloat(displayValue);
        if (!isNaN(secondOperand)) {
            displayValue = calculateResult(firstOperand, secondOperand, currentOperator).toString();
        }
    }
    firstOperand = parseFloat(displayValue);
    currentOperator = operator;
    displayValue = '0';
    updateScreen();
}

function handleOption(option) {
    if (option === '+/-') {
        displayValue = String(parseFloat(displayValue) * -1);
    } else if (option === '%') {
        displayValue = String(parseFloat(displayValue) / 100);
    }
    updateScreen();
}

document.querySelectorAll('.buttons').forEach(button => {
    button.addEventListener('click', event => {
        const buttonValue = event.target.textContent.trim();
        if ((buttonValue >= '0' && buttonValue <= '9') || buttonValue === '.') {
            appendNumber(buttonValue);
        } else if (buttonValue === 'AC') {
            clearScreen();
        } else if (buttonValue === '=') {
            if (currentOperator && firstOperand !== null) {
                secondOperand = parseFloat(displayValue);
                if (!isNaN(secondOperand)) {
                    displayValue = calculateResult(firstOperand, secondOperand, currentOperator).toString();
                    currentOperator = null;
                    firstOperand = null;
                    secondOperand = null;
                    updateScreen();
                }
            }
        } else if (buttonValue === '+/-' || buttonValue === '%') {
            handleOption(buttonValue);
        } else {
            handleOperator(buttonValue);
        }
    });
});

updateScreen();
