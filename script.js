var input = document.querySelector("input");
var buttons = document.querySelectorAll('button');
var resultInput = document.querySelector(".result-input");

var string = "";
var arr = Array.from(buttons);
var isEquationCompleted = false;

arr.forEach(buttons => {
    buttons.addEventListener('click', (e) => {
        handleButton(e.target.innerHTML);
    })
})

function handleButton(buttonValue) {
    if (isEquationCompleted && !isOperator(buttonValue)) {

        clearAll();
        isEquationCompleted = false;
    }
    if (buttonValue === '+' || buttonValue === "-" || buttonValue === "*") {
        handleOperator(buttonValue);
    } else if (buttonValue === '=') {
        calculateResult()
        isEquationCompleted = true;
    }
    else if (buttonValue === 'C') {
        clearAll()
    } else if (buttonValue === '<i class="fa-solid fa-delete-left"></i>') {
        deleteChar()
    } else if (buttonValue === '%') {
        percentage()
    }
    else {
        handleNumber(buttonValue)
    }
}

function handleOperator(operator) {
    if (string.length > 0 && isOperator(string[string.length - 1])) {
        string = string.slice(0, -1) + operator;
    } else {
        string += operator;
    }
    input.value = string;
}

function calculateResult() {
    var result;
    try {
        result = eval(string);
        if (isNaN(result) || result === Infinity || result === -Infinity) {
            resultInput.value = 'Error';
        } else {
            resultInput.value = result;
        }
    } catch (error) {
        resultInput.value = 'Error';
    }
}

function clearAll() {
    string = ""
    input.value = string;
    resultInput.value = ""
}

function deleteChar() {
    string = string.slice(0, -1);
    input.value = string;
}

function percentage() {
    var result = parseFloat((string) / 100);

    string = result.toString();
    input.value = string
}

function handleNumber(number) {
    string += number;
    input.value = string;
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}
