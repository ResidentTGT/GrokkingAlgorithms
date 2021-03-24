(() => {
    const template = document.createElement('template');

    template.innerHTML = `
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

    const array = [...Array(1000).keys()];
    const minValue = 0;
    const maxValue = 999;

    class BinarySearchComponent extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.binarySearch = this.binarySearch.bind(this);
        }

        connectedCallback() {
            this.shadowRoot.querySelector('.action-button').addEventListener('click', this.binarySearch);
        }

        disconnectedCallback() {
            this.shadowRoot.querySelector('.action-button').removeEventListener();
        }

        binarySearch() {
            const input = this.shadowRoot.querySelector('.item-input')?.value;

            if (!this.isValidInput(input)) {
                return;
            }

            const value = +input;

            let startIndex = 0;
            let endIndex = array.length - 1;

            let step = 1;

            let isFound = false;

            while (!isFound) {
                const guessIndex = Math.trunc((startIndex + endIndex) / 2);
                const guess = array[guessIndex];

                if (value > guess) {
                    startIndex = guessIndex + 1;
                } else if (value < guess) {
                    endIndex = guessIndex - 1;
                } else {
                    isFound = true;
                    break;
                }

                step += 1;
            }

            this.showResult(step);
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

        showResult(result) {
            const resultElem = this.shadowRoot.querySelector('.result');

            if (result) {
                resultElem.textContent = `This algorithm took ${result} steps to find the result.`;
            } else {
                resultElem.textContent = '';
            }
        }
    }

    customElements.define('binary-search-component', BinarySearchComponent);
})();
