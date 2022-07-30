class Calculator {
  constructor(previousOperandAndElementText, currentOperandAndElementText) {
    this.previousOperandAndElementText = previousOperandAndElementText;
    this.currentOperandAndElementText = currentOperandAndElementText;
    this.clear();
  }
  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if ( number === '.' || this.currentOperand === '.' ) return;
    console.log('appendNumber : ', number);
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  clickOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '' ) {
      this.compute();
    }
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.operation = operation;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) ||isNaN(current)) return;

    switch(this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }

    this.previousOperand = '';
    this.operation = undefined;
    this.currentOperand = computation;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return integerDisplay = `${integerDisplay}.${decimalDigits}`;
    } else
      return integerDisplay;
  }

  updateDisplay() {
    if (this.operation != null) {
      this.previousOperandAndElementText.innerText = this.previousOperand + this.operation;
    } else {
      this.previousOperandAndElementText.innerText = this.previousOperand;
    }
    this.currentOperandAndElementText.innerText = this.getDisplayNumber(this.currentOperand);
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButtons = document.querySelector('[data-all-clear]');
const deleteButtons = document.querySelector('[data-delete]');
const equalButtons = document.querySelector('[data-equal]');
const previousOperandAndElementText = document.querySelector('[data-previous-operand]');
const currentOperandAndElementText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandAndElementText, currentOperandAndElementText);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.clickOperation(button.innerText);
    calculator.updateDisplay();
  })
})

allClearButtons.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButtons.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})

equalButtons.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})