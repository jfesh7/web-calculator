//Calculator functions

function calculate(x, y, operator) {
	let result = x;
	if (!Number(x) && !Number(y)) {
		return 'Error';
	}
	if (!['+', '-', '*', '/'].includes(operator)) {
		return 'Invalid operation';
	}

	switch (operator) {
	case '+':
		result = x + y;
		break;
	case '-':
		result = x - y;
		break;
	case '*':
		result = x * y;
		break;
	case '/':
		result = x / y;
		break;
	}

	return result;
}

function evaluate(event, expression) {
	if (expression.secondary) {
		expression.main = calculate(Number(expression.main), Number(expression.secondary), expression.operator);
	}
	expression.secondary = '';
	expression.operator = '';
}

function storeOperation(event, expression) {
	if (expression.operator) {
		evaluate(event, expression);
	}
	expression.operator = event.target.value;
}

function storeNumber(event, expression) {
	if (!expression.operator) {
		expression.main += event.target.value;
	}
	else {
		if (!(expression.operator === '/' && event.target.value === '0')) {
			expression.secondary += event.target.value;	
		}
	}
	console.table(expression);
}

function updateDisplay(display, expression) {
	display.value = `${expression.main} ${expression.operator} ${expression.secondary}`;
}


//Calculator components
const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const equalButton = document.querySelector('#evaluate');
const display = document.querySelector('#display');
let currentExpression = {
	'main': '',
	'secondary': '',
	'operator': '',
};

numberButtons.forEach(button => button.addEventListener('click', (event) => {
	storeNumber(event, currentExpression);
	updateDisplay(display, currentExpression);
}));

operatorButtons.forEach(button => button.addEventListener('click', (event) => {
	storeOperation(event, currentExpression);
	updateDisplay(display, currentExpression);
}));

equalButton.addEventListener('click', (event) => {
	evaluate(event, currentExpression);
	updateDisplay(display, currentExpression);
});