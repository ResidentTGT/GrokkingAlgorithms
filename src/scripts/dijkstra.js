(() => {
    const template = document.createElement('template');

    template.innerHTML = `
    <link rel="stylesheet" href="src/styles/algorithm.css" />
    <div class="description">
    Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. <br>
    The algorithm exists in many variants. Dijkstra's original algorithm found the shortest path between two given nodes, but a more common variant fixes a single node as the "source" node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree. For a given source node in the graph, the algorithm finds the shortest path between that node and every other. It can also be used for finding the shortest paths from a single node to a single destination node by stopping the algorithm once the shortest path to the destination node has been determined.<br>
    In some fields, artificial intelligence in particular, Dijkstra's algorithm or a variant of it is known as uniform cost search and formulated as an instance of the more general idea of best-first search.
    </div>
    <div class="complexity">Complexity: O(V + E * log(V)) (where V is the number of nodes and E is the number of edges)</div>
    <div class="example-title">Example</div>
    <button class="action-button generate">Generate unsorted array!</button>
    <div class="condition">Unsorted array: []</div>
    <button class="action-button sort" disabled>Sort!</button>
    <div class="result"></div>
    `;

    const arrayLength = 30;
    let unsortedArray = [];
    let totalSteps = 0;

    class DijkstraComponent extends HTMLElement {
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

    customElements.define('dijkstra-component', DijkstraComponent);
})();
