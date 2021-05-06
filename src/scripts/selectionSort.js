(() => {
    const template = document.createElement('template');

    template.innerHTML = //html
    `
    <link rel="stylesheet" href="src/styles/algorithm.css" />
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
    <button class="action-button generate">Generate unsorted array!</button>
    <div class="condition">Unsorted array: []</div>
    <button class="action-button sort" disabled>Sort!</button>
    <div class="result"></div>
    `;

    let unsortedArray = [];
    const arrayLength = 30;

    class SelectionSortComponent extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.generateArray = this.generateArray.bind(this);
            this.sort = this.sort.bind(this);
        }

        connectedCallback() {
            this.shadowRoot.querySelector('.action-button.generate').addEventListener('click', this.generateArray);
            this.shadowRoot.querySelector('.action-button.sort').addEventListener('click', this.sort);
        }

        disconnectedCallback() {
            this.shadowRoot.querySelector('.action-button.generate').removeEventListener();
            this.shadowRoot.querySelector('.action-button.sort').removeEventListener();
        }

        sort() {
            const sortedArray = [];
            let totalSteps = 0;

            for (let i = 0; i < arrayLength; i++) {
                const { minIndex, steps } = this.findMin(unsortedArray);
                totalSteps += steps;
                sortedArray.push(unsortedArray.splice(minIndex, 1));
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
            this.shadowRoot.querySelector(' .result').innerHTML = `Sorted array (${
                sortedArray.length
            } items): [${sortedArray.join(' ,')}].
            <br>This algorithm took ${totalSteps} steps to find the result.
            <br>The real complexity is O(1/2 * n<sup>2</sup> - ${arrayLength}/2) due to the sequence of the number of items checked: n, n-1, n-2...2, 1. But constants in Big O notation are ignored.`;

            this.shadowRoot.querySelector('.action-button.sort').setAttribute('disabled', true);
        }

        generateArray() {
            unsortedArray = this.shuffleArray([...Array(arrayLength).keys()]);

            this.shadowRoot.querySelector('.condition').textContent = `Unsorted array (${arrayLength} items): [${unsortedArray.join(', ')}]`;

            this.shadowRoot.querySelector('.action-button.sort').removeAttribute('disabled');
            this.shadowRoot.querySelector('.result').innerHTML = '';
        }

        shuffleArray(array) {
            const shuffledArray = array.slice();

            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }

            return shuffledArray;
        }
    }

    customElements.define('selection-sort-component', SelectionSortComponent);
})();
