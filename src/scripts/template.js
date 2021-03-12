class RecursionComponent extends HTMLElement {
    minValue = 1;
    maxValue = 10;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.recursionClickHandler = this.recursionClickHandler.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <div class="algorithm-layout recursion">
        <a name="recursion">Recursion</a>
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
    </div>
    <style>
    .algorithm-layout {
        padding: 0 30px 20px 30px;
    }
    
    .algorithm-layout:not(:first-child) a {
        border-top: 1px solid #424242;
    }
    
    .algorithm-layout a {
        display: block;
        font-size: 24px;
        height: 55px;
        line-height: 55px;
        color: #fbc02d;
    }
    
    .description {
        width: 800px;
    }
    
    .complexity,
    .condition,
    .result {
        font-weight: 400;
        margin-top: 15px;
    }
    .result {
        line-height: 25px;
    }
    .example-title {
        margin-top: 15px;
        font-size: 20px;
        color: #fbc02d;
    }
    
    .item-input,
    .action-button {
        margin-top: 15px;
        width: 240px;
        height: 35px;
        border: none;
        border-radius: 5px;
        padding: 0 10px;
        box-sizing: border-box;
        outline: none;
        font-size: 16px;
    }
    
    .error {
        transition: 200ms;
        opacity: 0;
        color: #f44336;
        margin-left: 20px;
    }
    
    .show {
        opacity: 1;
    }
    
    .action-button {
        display: block;
        cursor: pointer;
        color: #212121;
        background: #fbc02d;
        transition: 300ms;
    }
    
    .action-button:hover:not(:disabled) {
        background: #424242;
        color: #fbc02d;
    }
    
    .action-button:disabled {
        background: #616161;
    }
    
    </style>
        `;
        setTimeout(() =>
            this.shadowRoot.querySelector('.recursion .action-button').addEventListener('click', this.recursionClickHandler),
        );
    }

    recursionClickHandler() {
        const input = this.shadowRoot.querySelector('.recursion .item-input')?.value;

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

        if (!input || isNaN(value) || !Number.isInteger(value) || value < this.minValue || value > this.maxValue) {
            this.showError();
            this.showResult();
            return false;
        } else {
            this.showError(false);
            return true;
        }
    }

    showError(show = true) {
        const errorElem = this.shadowRoot.querySelector('.recursion .error');

        if (show) {
            errorElem.classList.add('show');
        } else {
            errorElem.classList.remove('show');
        }
    }

    showResult(input, result) {
        const resultElem = this.shadowRoot.querySelector('.recursion .result');

        if (result) {
            resultElem.textContent = `The factorial of ${input} is ${result}.`;
        } else {
            resultElem.textContent = '';
        }
    }
}

customElements.define('recursion-component', RecursionComponent);
