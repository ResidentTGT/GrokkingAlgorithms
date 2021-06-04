const dijkstraTemplate = document.createElement('template');

dijkstraTemplate.innerHTML = `
    <style> 
    
    </style>
    <link rel="stylesheet" href="src/styles/algorithm.css" />
    <div class="description">
    Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. <br>
    The algorithm exists in many variants. Dijkstra's original algorithm found the shortest path between two given nodes, but a more common variant fixes a single node as the "source" node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree. For a given source node in the graph, the algorithm finds the shortest path between that node and every other. It can also be used for finding the shortest paths from a single node to a single destination node by stopping the algorithm once the shortest path to the destination node has been determined.<br>
    In some fields, artificial intelligence in particular, Dijkstra's algorithm or a variant of it is known as uniform cost search and formulated as an instance of the more general idea of best-first search.
    </div>
    <div class="complexity">Complexity: O(V + E * log(V)) (where V is the number of nodes and E is the number of edges)</div>
    <div class="example-title">Example</div>
    <button class="action-button generate">Generate graph!</button>
    <div class="graph"></div>
    <button class="action-button find" disabled>Find the shortest way!</button>
    <div class="result"></div>
    `;

class Node {
    constructor(name, neighbors) {
        this.name = name;
        this.neighbors = neighbors;
    }
}

class DijkstraComponent extends HTMLElement {
    constructor() {
        super();

        this._from = 1;
        this._to = 10;

        this._nodes = [
            new Node('start', ['a', 'b']),
            new Node('a', ['b', 'c']),
            new Node('b', ['c', 'd']),
            new Node('c', ['d', 'e', 'f']),
            new Node('d', ['f']),
            new Node('e', ['end']),
            new Node('f', ['e', 'end']),
            new Node('end'),
        ];

        this._graph = new Map();
        this._costs = new Map();
        this._parents = new Map();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(dijkstraTemplate.content.cloneNode(true));

        this.$generateButton = this.shadowRoot.querySelector('.action-button.generate');
        this.$findButton = this.shadowRoot.querySelector('.action-button.find');
        this.$graph = this.shadowRoot.querySelector('.graph');
        this.$result = this.shadowRoot.querySelector('.result');
    }

    connectedCallback() {
        this.$generateButton.addEventListener('click', () => this.generateGraphClickHandler());
        this.$findButton.addEventListener('click', () => this.dijkstraClickHandler());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.action-button.generate').removeEventListener();
        this.shadowRoot.querySelector('.action-button.find').removeEventListener();
    }

    dijkstraClickHandler() {}

    generateGraphClickHandler() {
        this.fillGraph();
    }

    fillGraph() {
        this._nodes.forEach(n => {
            const neighbors = new Map();
            if (n.neighbors) {
                n.neighbors.forEach(nr => neighbors.set(nr, window.generateRandomInteger(this._from, this._to)));
            }
            this._graph.set(n, neighbors);
        });

        const startNode = this._nodes.find(n => n.name === 'start');
        this._nodes
            .filter(n => n !== startNode)
            .forEach(n => {
                const child = startNode.neighbors.find(c => c === n.name);
                if (child) {
                    this._costs.set(n, this._graph.get(startNode).get(child));
                } else {
                    this._costs.set(n, Infinity);
                }
            });
    }
}

customElements.define('dijkstra-component', DijkstraComponent);
