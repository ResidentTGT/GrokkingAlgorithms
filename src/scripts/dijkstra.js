const dijkstraTemplate = document.createElement('template');

dijkstraTemplate.innerHTML = `
    <link rel="stylesheet" href="src/styles/algorithm.css" />
    <style> 
    .graph {
        display: none;
        margin-top: 20px;
        overflow:visible;
    }
    .color{
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

        this.initNodes();
        this.initGraph();

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

    dijkstraClickHandler() {
        const processed = [];
        let node = this.findLowestCostNode(this._costs, processed);
        while (node) {
            const cost = this._costs.get(node);
            const neighbors = this._graph.get(node);

            for (const [neighborNodeName, neighborCost] of neighbors) {
                const neighborNode = this._nodes.find(n => n.name === neighborNodeName);
                const newCost = cost + neighborCost;
                if (this._costs.get(neighborNode) > newCost) {
                    this._costs.set(neighborNode, newCost);
                    this._parents.set(neighborNode, node);
                }
            }
            processed.push(node);
            node = this.findLowestCostNode(this._costs, processed);
        }

        console.dir(this._costs);
        console.dir(this._parents);
    }

    findLowestCostNode(costs, processed) {
        let lowestCost = Infinity;
        let lowestCostNode;

        for (const [node, cost] of costs) {
            if (cost < lowestCost && !processed.some(p => p === node)) {
                lowestCost = cost;
                lowestCostNode = node;
            }
        }
        return lowestCostNode;
    }

    generateGraphClickHandler() {
        this.initGraph();
        this.fillGraph();
        this.drawGraph();
        this.$findButton.removeAttribute('disabled');
    }

    initNodes() {
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
    }

    initGraph() {
        this._graph = new Map();
        this._costs = new Map();
        this._parents = new Map();
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
        this.$graph.innerHTML = '';
        this.drawMarker();

        this._nodes.forEach(node => {
            const neighbors = node.neighbors
                ? this._nodes.filter(n => node.neighbors.some(neighbor => neighbor === n.name))
                : [];

            const nodeCosts = this._graph.get(node);

            neighbors.forEach(neighbor => {
                this.drawLine(node, neighbor);

                const cost = nodeCosts.get(neighbor.name);
                this.drawCost(node, neighbor, cost);
            });
        });

        this._nodes.forEach(n => {
            this.drawCircle(n);
            this.drawNodeName(n);
        });

        this.$graph.style.display = 'block';
    }

    drawMarker() {
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
    }

    drawLine(point1, point2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', point1.position.x);
        line.setAttribute('y1', point1.position.y);
        line.setAttribute('x2', point2.position.x);
        line.setAttribute('y2', point2.position.y);
        line.setAttribute('marker-end', 'url(#arrow)');
        line.classList.add('line');
        this.$graph.appendChild(line);
    }

    drawCost(point1, point2, cost) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', (point1.position.x + point2.position.x) / 2 - 5);
        text.setAttribute('y', (point1.position.y + point2.position.y) / 2 + 8);
        text.classList.add('color');
        text.textContent = cost;
        this.$graph.appendChild(text);
    }

    drawCircle(node) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.position.x);
        circle.setAttribute('cy', node.position.y);
        circle.setAttribute('r', 4);
        circle.classList.add('color');
        this.$graph.appendChild(circle);
    }

    drawNodeName(node) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.position.x);
        text.setAttribute('y', node.position.y + 18);
        text.classList.add('color');
        text.textContent = node.name;
        this.$graph.appendChild(text);
    }
}

customElements.define('dijkstra-component', DijkstraComponent);
