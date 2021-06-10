const recursionTemplate = document.createElement('template');

recursionTemplate.innerHTML = `
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

class RecursionComponent extends HTMLElement {
    constructor() {
        super();

        this._minValue = 1;
        this._maxValue = 10;

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(recursionTemplate.content.cloneNode(true));

        this.$recursionButton = this.shadowRoot.querySelector('.action-button');
        this.$input = this.shadowRoot.querySelector('.item-input');
        this.$error = this.shadowRoot.querySelector('.error');
        this.$result = this.shadowRoot.querySelector('.result');
    }

    connectedCallback() {
        this.$recursionButton.addEventListener('click', () => this.recursionClickHandler());
    }

    disconnectedCallback() {
        this.$recursionButton.removeEventListener();
    }

    recursionClickHandler() {
        const input = this.$input?.value;

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

        if (!input || isNaN(value) || !Number.isInteger(value) || value < this._minValue || value > this._maxValue) {
            this.showError();
            this.showResult();
            return false;
        } else {
            this.showError(false);
            return true;
        }
    }

    showError(show = true) {
        show ? this.$error.classList.add('show') : this.$error.classList.remove('show');
    }

    showResult(input, result) {
        this.$result.textContent = result ? `The factorial of ${input} is ${result}.` : '';
    }
}

customElements.define('recursion-component', RecursionComponent);
