const greedyTemplate = document.createElement('template');

greedyTemplate.innerHTML = `
    <link rel="stylesheet" href="assets/css/algorithm.css" />
    <style> 
    </style>
    <div class="description">
    A greedy algorithm is any algorithm that follows the problem-solving heuristic of making the locally optimal choice at each stage.
    In many problems, a greedy strategy does not usually produce an optimal solution, but nonetheless, a greedy heuristic may yield locally optimal solutions that approximate a globally optimal solution in a reasonable amount of time.
    </div>
    <div class="example-title">Example</div>
    <div class="condition">We want to find the minimum set of stations that covers all states: mt, wa, or, id, nv, ut.</div>
    <button class="action-button generate">Generate stations!</button>
    <div class="condition stations"></div>
    <button class="action-button find" disabled>Find the !</button>
    <div class="result"></div>
    `;

class GreedyComponent extends HTMLElement {
    constructor() {
        super();

        this.initStatesAndStations();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(greedyTemplate.content.cloneNode(true));

        this.$generateButton = this.shadowRoot.querySelector('.action-button.generate');
        this.$findButton = this.shadowRoot.querySelector('.action-button.find');
        this.$stations = this.shadowRoot.querySelector('.stations');
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

    initStatesAndStations() {
        this._states = new Set(['mt', 'wa', 'or', 'id', 'nv', 'ut']);
        this._stations = new Map([['one'], ['two'], ['three'], ['four'], ['five']]);
    }

    generateStationsClickHandler() {
        this.initStatesAndStations();

        const allStates = [...this._states];

        const statesStations = new Set();
        for (const [station] of this._stations) {
            const states = new Set();
            for (let i = 0; i < 3; i++) {
                const randomState = allStates[window.generateRandomInteger(0, allStates.length - 1)];
                states.add(randomState);
                statesStations.add(randomState);
            }
            this._stations.set(station, states);
        }
        const remainedStates = allStates.filter(s => !statesStations.has(s));

        this._stations.set('one', new Set([...this._stations.get('one')].concat(remainedStates)));

        this.showStations();

        this.$findButton.removeAttribute('disabled');
    }

    dijkstraClickHandler() {
        const finalStations = new Set();
        let statesNeeded = new Set([...this._states]);

        while (statesNeeded.size) {
            let bestStation;
            let statesCovered = new Set();
            for (const [station, states] of this._stations) {
                const covered = new Set([...statesNeeded].filter(x => states.has(x)));
                if (covered.size > statesCovered.size) {
                    bestStation = station;
                    statesCovered = covered;
                }
            }
            statesNeeded = new Set([...statesNeeded].filter(x => !statesCovered.has(x)));
            finalStations.add(bestStation);
        }

        this.$result.innerHTML = `Final stations are: ${[...finalStations].join(', ')}`;
    }

    showStations() {
        let str = '';
        for (const [station, states] of this._stations) {
            str += `Station ${station}: ${[...states].join(', ')}<br>`;
        }
        this.$stations.innerHTML = str;
        this.$result.innerHTML = '';
    }
}

customElements.define('greedy-component', GreedyComponent);
