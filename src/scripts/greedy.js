const greedyTemplate = document.createElement('template');

greedyTemplate.innerHTML = `
    <link rel="stylesheet" href="src/styles/algorithm.css" />
    <style> 
    </style>
    <div class="description">
    A greedy algorithm is any algorithm that follows the problem-solving heuristic of making the locally optimal choice at each stage.
    In many problems, a greedy strategy does not usually produce an optimal solution, but nonetheless, a greedy heuristic may yield locally optimal solutions that approximate a globally optimal solution in a reasonable amount of time.
    </div>
    <div class="example-title">Example</div>
    <button class="action-button generate">Generate stations!</button>
    <button class="action-button find" disabled>Find the !</button>
    <div class="result"></div>
    `;

class GreedyComponent extends HTMLElement {
    constructor() {
        super();

        this._states = new Set(['mt', 'wa', 'or', 'id', 'nv', 'ut']);
        this._stations = new Map([['one'], ['two'], ['three'], ['four'], ['five']]);

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(greedyTemplate.content.cloneNode(true));

        this.$generateButton = this.shadowRoot.querySelector('.action-button.generate');
        this.$findButton = this.shadowRoot.querySelector('.action-button.find');
        this.$graph = this.shadowRoot.querySelector('.graph');
        this.$result = this.shadowRoot.querySelector('.result');
    }

    connectedCallback() {
        this.$generateButton.addEventListener('click', () => this.generateStationsClickHandler());
        this.$findButton.addEventListener('click', () => this.dijkstraClickHandler());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.action-button.generate').removeEventListener();
        this.shadowRoot.querySelector('.action-button.find').removeEventListener();
    }

    generateStationsClickHandler() {
        const allStates = Array.from(this._states);
        for (const [station] of this._stations) {
            const states = [];
            for (let i = 0; i < 3; i++) {
                states.push(allStates[generateRandomInteger(0, 5)]);
            }
            this._stations.set(station, states);
        }
    }
}

customElements.define('greedy-component', GreedyComponent);
