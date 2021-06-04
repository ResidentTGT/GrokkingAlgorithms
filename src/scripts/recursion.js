const template = document.createElement('template');

template.innerHTML = `
    <link rel="stylesheet" href="src/styles/algorithm.css" />
    <div class="description">
        Recursion occurs when a thing is defined in terms of itself or of its type. The most common
        application of recursion is in mathematics and computer science, where a function being defined is
        applied within its own definition. While this apparently defines an infinite number of instances
        (function values), it is often done in such a way that no infinite loop or infinite chain of
        references can occur.<br />
        In mathematics and computer science, a class of objects or methods exhibits recursive behavior when
        it can be defined by two properties:<br />&#8226; A simple base case (or cases) — a terminating
        scenario that does not use recursion to produce an answer<br />&#8226; A recursive step — a set of
        rules that reduces all successive cases toward the base case.
    </div>
    <div class="example-title">Example</div>
    <div class="condition">
        In this example we will calculate the factorial of a number using the recursive method.
    </div>
    <input class="item-input" type="number" placeholder="Enter number from 1 to 10" />
    <span class="error">Invalid value! Enter integer number from 1 to 10!</span>
    <button class="action-button">Find!</button>
    <div class="result"></div>
    `;

const minValue = 1;
const maxValue = 10;

class RecursionComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.recursionClickHandler = this.recursionClickHandler.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.action-button').addEventListener('click', this.recursionClickHandler);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.action-button').removeEventListener();
    }

    recursionClickHandler() {
        const input = this.shadowRoot.querySelector('.item-input')?.value;

        if (!this.isValidInput(input)) {
            return;
        }

        const factorial = this.calcFactorial(+input);

        this.showResult(input, factorial);
    }

    calcFactorial(input) {
        if (input === 1) {
            return 1;
        } else {
            return input * this.calcFactorial(input - 1);
        }
    }

    isValidInput(input) {
        const value = +input;

        if (!input || isNaN(value) || !Number.isInteger(value) || value < minValue || value > maxValue) {
            this.showError();
            this.showResult();
            return false;
        } else {
            this.showError(false);
            return true;
        }
    }

    showError(show = true) {
        const errorElem = this.shadowRoot.querySelector('.error');

        if (show) {
            errorElem.classList.add('show');
        } else {
            errorElem.classList.remove('show');
        }
    }

    showResult(input, result) {
        const resultElem = this.shadowRoot.querySelector('.result');

        if (result) {
            resultElem.textContent = `The factorial of ${input} is ${result}.`;
        } else {
            resultElem.textContent = '';
        }
    }
}

customElements.define('recursion-component', RecursionComponent);
