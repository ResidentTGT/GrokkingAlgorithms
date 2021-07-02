const selectionSortTemplate = document.createElement('template');

selectionSortTemplate.innerHTML = `
    <link rel="stylesheet" href="assets/css/algorithm.css" />
    <div class="description">
        In computer science, selection sort is an in-place comparison sorting algorithm. It has an O(n2)
        time complexity, which makes it inefficient on large lists, and generally performs worse than the
        similar insertion sort. Selection sort is noted for its simplicity and has performance advantages
        over more complicated algorithms in certain situations, particularly where auxiliary memory is
        limited.<br />The algorithm divides the input list into two parts: a sorted sublist of items which
        is built up from left to right at the front (left) of the list and a sublist of the remaining
        unsorted items that occupy the rest of the list. Initially, the sorted sublist is empty and the
        unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or
        largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with
        the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one
        element to the right.
    </div>
    <div class="complexity">Complexity: O(n<sup>2</sup>)</div>
    <div class="example-title">Example</div>
    <div class="condition">We want to sort the array generated below and count the number of the algorithm steps(iterations).</div>
    <button class="action-button generate">Generate unsorted array!</button>
    <div class="condition array">Unsorted array: []</div>
    <button class="action-button sort" disabled>Sort!</button>
    <div class="result"></div>
    `;

class SelectionSortComponent extends HTMLElement {
    constructor() {
        super();

        this._arrayLength = 30;
        this._unsortedArray = [];

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(selectionSortTemplate.content.cloneNode(true));

        this.$generateButton = this.shadowRoot.querySelector('.action-button.generate');
        this.$sortButton = this.shadowRoot.querySelector('.action-button.sort');
        this.$result = this.shadowRoot.querySelector('.result');
        this.$condition = this.shadowRoot.querySelector('.condition.array');
    }

    connectedCallback() {
        this.$generateButton.addEventListener('click', () => this.generateArray());
        this.$sortButton.addEventListener('click', () => this.selectionSort());
    }

    disconnectedCallback() {
        this.$generateButton.removeEventListener();
        this.$sortButton.removeEventListener();
    }

    selectionSort() {
        const sortedArray = [];
        let totalSteps = 0;

        for (let i = 0; i < this._arrayLength; i++) {
            const { minIndex, steps } = this.findMin(this._unsortedArray);
            totalSteps += steps;
            sortedArray.push(this._unsortedArray.splice(minIndex, 1));
        }

        this.showResult(sortedArray, totalSteps);
    }

    findMin(array) {
        let steps = 0;
        let minIndex = 0;
        let min = array[minIndex];

        for (let i = minIndex + 1; i < array.length; i++) {
            steps += 1;
            if (array[i] < min) {
                minIndex = i;
                min = array[i];
            }
        }

        return { minIndex, steps };
    }

    showResult(sortedArray, totalSteps) {
        this.$result.innerHTML = `Sorted array (${sortedArray.length} items): [${sortedArray.join(', ')}].
            <br>This algorithm took ${totalSteps} steps to find the result.
            <br>Due to the sequence of the number of items checked (n, n-1, n-2...2, 1) the real complexity is 1/2 * n<sup>2</sup> - ${this._arrayLength}/2. 
            But constants in Big O notation are ignored.`;

        this.$sortButton.setAttribute('disabled', true);
    }

    generateArray() {
        this._unsortedArray = window.shuffleArray([...Array(this._arrayLength).keys()]);

        this.$condition.textContent = `Unsorted array (${this._arrayLength} items): [${this._unsortedArray.join(
            ', ',
        )}]`;

        this.$sortButton.removeAttribute('disabled');
        this.$result.innerHTML = '';
    }
}

customElements.define('selection-sort-component', SelectionSortComponent);
