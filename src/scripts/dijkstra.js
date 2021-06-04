const dijkstraTemplate = document.createElement('template');

dijkstraTemplate.innerHTML = `
    <link rel="stylesheet" href="src/styles/algorithm.css" />
    <style> 
    .graph {
        display: none;
        margin-top: 20px;
        overflow:visible;
    }
    .circle{
        fill:white;
    }
    .line{
        stroke-width:1px;
        stroke:gray;
    }
    </style>
    <div class="description">
    Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. <br>
    The algorithm exists in many variants. Dijkstra's original algorithm found the shortest path between two given nodes, but a more common variant fixes a single node as the "source" node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree. For a given source node in the graph, the algorithm finds the shortest path between that node and every other. It can also be used for finding the shortest paths from a single node to a single destination node by stopping the algorithm once the shortest path to the destination node has been determined.<br>
    In some fields, artificial intelligence in particular, Dijkstra's algorithm or a variant of it is known as uniform cost search and formulated as an instance of the more general idea of best-first search.
    </div>
    <div class="complexity">Complexity: O(V + E * log(V)) (where V is the number of nodes and E is the number of edges)</div>
    <div class="example-title">Example</div>
    <button class="action-button generate">Generate graph!</button>
    <svg class="graph" height="140"></svg>
    <button class="action-button find" disabled>Find the shortest way!</button>
    <div class="result"></div>
    `;

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Node {
    constructor(name, neighbors, position) {
        this.name = name;
        this.neighbors = neighbors;
        this.position = position;
    }
}

class DijkstraComponent extends HTMLElement {
    constructor() {
        super();

        const interval = 60;
        this._nodes = [
            new Node('start', ['a', 'b'], new Position(0, interval)),
            new Node('a', ['b', 'c'], new Position(interval, 0)),
            new Node('b', ['c', 'd'], new Position(interval, 2 * interval)),
            new Node('c', ['d', 'e', 'f'], new Position(2 * interval, 0)),
            new Node('d', ['f'], new Position(2 * interval, 2 * interval)),
            new Node('e', ['end'], new Position(3 * interval, 0)),
            new Node('f', ['e', 'end'], new Position(3 * interval, 2 * interval)),
            new Node('end', null, new Position(4 * interval, interval)),
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
        this.drawGraph();
    }

    fillGraph() {
        this._nodes.forEach(n => {
            const neighbors = new Map();
            if (n.neighbors) {
                n.neighbors.forEach(nr => neighbors.set(nr, window.generateRandomInteger(1, 9)));
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

    drawGraph() {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M 0 0 L 15 5 L 0 10 z');
        path.style.fill = 'gray';

        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrow');
        marker.setAttribute('refX', 20);
        marker.setAttribute('refY', 5);
        marker.setAttribute('markerWidth', 20);
        marker.setAttribute('markerHeight', 10);
        marker.setAttribute('orient', 'auto');

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

        marker.appendChild(path);
        defs.appendChild(marker);
        this.$graph.appendChild(defs);

        this._nodes.forEach(n => {
            const neighbors = this._nodes.filter(node => n.neighbors && n.neighbors.some(nr => nr === node.name));

            const costs = this._graph.get(n);

            neighbors.forEach(nr => {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', n.position.x);
                line.setAttribute('y1', n.position.y);
                line.setAttribute('x2', nr.position.x);
                line.setAttribute('y2', nr.position.y);
                line.setAttribute('marker-end', 'url(#arrow)');
                line.classList.add('line');
                this.$graph.appendChild(line);

                const cost = costs.get(nr.name);
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', (n.position.x + nr.position.x) / 2 - 5);
                text.setAttribute('y', (n.position.y + nr.position.y) / 2 + 8);
                text.setAttribute('fill', 'white');
                text.textContent = cost;
                this.$graph.appendChild(text);
            });
        });
        this._nodes.forEach(n => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', n.position.x);
            circle.setAttribute('cy', n.position.y);
            circle.setAttribute('r', 4);
            circle.classList.add('circle');
            this.$graph.appendChild(circle);

            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', n.position.x);
            text.setAttribute('y', n.position.y + 18);
            text.setAttribute('fill', 'white');
            text.textContent = n.name;
            this.$graph.appendChild(text);
        });

        this.$graph.style.display = 'block';
    }
}

customElements.define('dijkstra-component', DijkstraComponent);
