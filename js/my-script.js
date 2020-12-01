// theme script
const body = document.querySelector("body")
const themeBtn = document.querySelector("#theme-btn")
const themeCheck = document.querySelector("#theme-check")

const storedTheme = localStorage.getItem("theme") || "light"
if (storedTheme === "dark") {
    themeCheck.checked = true
}

themeBtn.onclick = () => toggleTheme()

function toggleTheme() {
    const currentTheme = (themeCheck.checked) ? "dark" : "light"
    body.className = currentTheme
    localStorage.theme = currentTheme
}
toggleTheme()

// calculator script
class Calculator {
    constructor(previousOperandEl, currentOperandEl) {
        this.previousOperandEl = previousOperandEl
        this.currentOperandEl = currentOperandEl
        this.allClear()
    }

    allClear() {
        this.previousOperand = ""
        this.currentOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.toString().includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        switch (this.operation) {
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "×":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits !== undefined) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandEl.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation !== undefined) {
            this.previousOperandEl.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandEl.innerText = ""
        }
    }
}

const numberBtns = document.querySelectorAll(".number")
const operationBtns = document.querySelectorAll(".operation")
const acBtn = document.querySelector("#ac")
const delBtn = document.querySelector("#del")
const equalBtn = document.querySelector("#equal")
const previousOperandEl = document.querySelector("#previous-operand")
const currentOperandEl = document.querySelector("#current-operand")

const calculator = new Calculator(previousOperandEl, currentOperandEl)

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

acBtn.addEventListener("click", button => {
    calculator.allClear()
    calculator.updateDisplay()
})

delBtn.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})

equalBtn.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})