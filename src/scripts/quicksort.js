(() => {
    const template = document.createElement('template');

    template.innerHTML = `
    <link rel="stylesheet" href="src/styles/algorithm.css" />
    <div class="description">
    Quicksort is an in-place sorting algorithm. When implemented well, it can be somewhat faster than merge sort and about two or three times faster than heapsort.<br>
    Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting.
    Efficient implementations of Quicksort are not a stable sort, meaning that the relative order of equal sort items is not preserved. <br> 
    Mathematical analysis of quicksort shows that, on average, the algorithm takes O(n * log(n)) comparisons to sort n items. In the worst case, it makes O(n<sup>2</sup>) comparisons, though this behavior is rare.
    </div>
    <div class="complexity">Complexity: O(n * log(n))</div>
    <div class="example-title">Example</div>
    <button class="action-button generate">Generate unsorted array!</button>
    <div class="condition">Unsorted array: []</div>
    <button class="action-button sort" disabled>Sort!</button>
    <div class="result"></div>
    `;

    const arrayLength = 30;
    let unsortedArray = [];
    let totalSteps = 0;

    class QuicksortComponent extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.generateArrayClickHandler = this.generateArrayClickHandler.bind(this);
            this.quicksortClickHandler = this.quicksortClickHandler.bind(this);
        }

        connectedCallback() {
            this.shadowRoot
                .querySelector('.action-button.generate')
                .addEventListener('click', this.generateArrayClickHandler);
            this.shadowRoot.querySelector('.action-button.sort').addEventListener('click', this.quicksortClickHandler);
        }

        disconnectedCallback() {
            this.shadowRoot.querySelector('.action-button.generate').removeEventListener();
            this.shadowRoot.querySelector('.action-button.sort').removeEventListener();
        }

        quicksortClickHandler() {
            totalSteps = 0;

            const sortedArray = this.quicksort(unsortedArray);

            this.showResult(sortedArray, totalSteps);
        }

        quicksort(array) {
            if (array.length < 2) {
                return array;
            } else {
                const pivot = array[0];

                const less = [];
                const greater = [];

                for (let i = 1; i < array.length; i++) {
                    totalSteps += 1;

                    if (array[i] <= pivot) {
                        less.push(array[i]);
                    } else {
                        greater.push(array[i]);
                    }
                }

                return this.quicksort(less).concat(pivot).concat(this.quicksort(greater));
            }
        }

        showResult(sortedArray, totalSteps) {
            this.shadowRoot.querySelector(' .result').innerHTML = `Sorted array (${
                sortedArray.length
            } items): [${sortedArray.join(' ,')}].
            <br>This algorithm took ${totalSteps} steps to sort the array.
            <br>This is close to the theoretical complexity of the algorithm O(n * log(n)) = 30 * log(30) &#8776; 147`;

            this.shadowRoot.querySelector('.action-button.sort').setAttribute('disabled', true);
        }

        generateArrayClickHandler() {
            unsortedArray = window.shuffleArray([...Array(arrayLength).keys()]);

            this.shadowRoot.querySelector(
                '.condition',
            ).textContent = `Unsorted array (${arrayLength} items): [${unsortedArray.join(', ')}]`;

            this.shadowRoot.querySelector('.action-button.sort').removeAttribute('disabled');
            this.shadowRoot.querySelector('.result').innerHTML = '';
        }
    }

    customElements.define('quicksort-component', QuicksortComponent);
})();
