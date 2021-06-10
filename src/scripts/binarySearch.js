const binarySearchTemplate = document.createElement('template');

binarySearchTemplate.innerHTML = `
        <link rel="stylesheet" href="src/styles/algorithm.css" />
        <div class="description">
            In computer science, binary search, also known as half-interval search, logarithmic search, or
            binary chop, is a search algorithm that finds the position of a target value within a sorted array.
            Binary search compares the target value to the middle element of the array. If they are not equal,
            the half in which the target cannot lie is eliminated and the search continues on the remaining
            half, again taking the middle element to compare to the target value, and repeating this until the
            target value is found. If the search ends with the remaining half being empty, the target is not in
            the array.
        </div>
        <div class="complexity">Complexity: O(log(n))</div>
        <div class="example-title">Example</div>
        <div class="condition">Sorted array: [0...999]</div>
        <input class="item-input" type="number" placeholder="Enter number from 0 to 999" />
        <span class="error">Invalid value! Enter integer number from 0 to 999!</span>
        <button class="action-button">Find!</button>
        <div class="result"></div>
    `;

class BinarySearchComponent extends HTMLElement {
    constructor() {
        super();

        this._array = [...Array(1000).keys()];
        this._minValue = 0;
        this._maxValue = 999;

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(binarySearchTemplate.content.cloneNode(true));

        this.$searchButton = this.shadowRoot.querySelector('.action-button');
        this.$input = this.shadowRoot.querySelector('.item-input');
        this.$error = this.shadowRoot.querySelector('.error');
        this.$result = this.shadowRoot.querySelector('.result');
    }

    connectedCallback() {
        this.$searchButton.addEventListener('click', () => this.searchButtonHandler());
    }

    disconnectedCallback() {
        this.$searchButton.removeEventListener();
    }

    searchButtonHandler() {
        const input = this.$input.value;

        const searchValue = +input;

        if (!this.isValidInput(input)) {
            this.showError();
            this.showResult();
            return;
        } else {
            this.showError(false);
        }

        const steps = this.binarySearch(this._array, searchValue);

        this.showResult(steps);
    }

    binarySearch(array, searchValue) {
        let startIndex = 0;
        let endIndex = array.length - 1;

        let steps = 1;

        let isFound = false;

        while (!isFound) {
            const guessIndex = Math.trunc((startIndex + endIndex) / 2);
            const guess = array[guessIndex];

            if (searchValue > guess) {
                startIndex = guessIndex + 1;
            } else if (searchValue < guess) {
                endIndex = guessIndex - 1;
            } else {
                isFound = true;
                break;
            }

            steps += 1;
        }

        return steps;
    }

    isValidInput(input) {
        const value = +input;

        return !(
            !input ||
            isNaN(value) ||
            !Number.isInteger(value) ||
            value < this._minValue ||
            value > this._maxValue
        );
    }

    showError(show = true) {
        show ? this.$error.classList.add('show') : this.$error.classList.remove('show');
    }

    showResult(result) {
        this.$result.textContent = result ? `This algorithm took ${result} steps to find the result.` : '';
    }
}

customElements.define('binary-search-component', BinarySearchComponent);
