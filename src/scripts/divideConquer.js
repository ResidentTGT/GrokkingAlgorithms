const divideConquerTemplate = document.createElement('template');

divideConquerTemplate.innerHTML = `
        <link rel="stylesheet" href="src/styles/algorithm.css" />
        
        <style>
        .item-input {
            width: 80px;
            margin-left: 10px;
        }
        
        .graph {
            flex-flow: wrap;
            background: #424242;
        }
        
        .square {
            border: 1px solid white;
            box-sizing: border-box;
        }      
        </style>

        <div class="description">
        A divide-and-conquer algorithm recursively breaks down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly.
        The solutions to the sub-problems are then combined to give a solution to the original problem. <br />
        The divide-and-conquer technique is the basis of efficient algorithms for many problems, such as sorting (e.g., quicksort, merge sort), multiplying large numbers (e.g., the Karatsuba algorithm), finding the closest pair of points, syntactic analysis. <br />
        Designing efficient divide-and-conquer algorithms can be difficult. As in mathematical induction, it is often necessary to generalize the problem to make it amenable to recursive solution. 
        The correctness of a divide-and-conquer algorithm is usually proved by mathematical induction, and its computational cost is often determined by solving recurrence relations.
        </div>
        <div class="example-title">Example</div>
        <div class="condition">
            In this example we will divide the rectangle into equal squares. Goal: determine the largest size of the square.
        </div>
        <span>Enter values of the sides of the rectangle from 1 to 50</span>
        <input class="item-input" type="number"  />
        <input class="item-input" type="number"  />
        <span class="error">Invalid value! Enter number from 1 to 50!</span>
        <button class="action-button">Determine the largest size!</button>
        <div class="result"></div>
        <div class="graph"></div>
    `;

class DivideConquerComponent extends HTMLElement {
    constructor() {
        super();

        this._minValue = 1;
        this._maxValue = 50;
        this._squareWrapperSize = 300;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(divideConquerTemplate.content.cloneNode(true));

        this.divideConquer = this.divideConquer.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.action-button').addEventListener('click', this.divideConquer);
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.action-button').removeEventListener();
    }

    divideConquer() {
        const inputs = this.shadowRoot.querySelectorAll('.item-input');

        if (inputs.length !== 2 || Array.from(inputs).some(i => !this.isValidInput(i.value))) {
            this.showError();
            this.showResult();
            return;
        } else {
            this.showError(false);
        }

        const [width, height] = [+inputs[0].value, +inputs[1].value];

        const maxSquareSize = this.getMaxSizeRecursion(width, height);

        this.showResult(maxSquareSize, width, height);
    }

    getMaxSizeRecursion(width, height) {
        const [min, max] = width > height ? [height, width] : [width, height];

        const rest = max % min;

        if (rest === 0) {
            return min;
        } else {
            return this.getMaxSizeRecursion(rest, min);
        }
    }

    isValidInput(input) {
        const value = +input;

        return !(
            !input ||
            isNaN(value) ||
            !Number.isInteger(value) ||
            value < this._minValue ||
            value > this._maxValue
        );
    }

    showError(show = true) {
        const errorElem = this.shadowRoot.querySelector('.error');

        if (show) {
            errorElem.classList.add('show');
        } else {
            errorElem.classList.remove('show');
        }
    }

    showResult(result, width, height) {
        const resultElem = this.shadowRoot.querySelector('.result');
        const graphElem = this.shadowRoot.querySelector('.graph');

        if (result) {
            const max = Math.max(width, height);

            resultElem.textContent = `Width: ${width}, height: ${height}, max square size: ${result}.`;

            graphElem.style.display = 'flex';
            graphElem.innerHTML = '';
            graphElem.style.width = `${(width / max) * this._squareWrapperSize}px`;
            graphElem.style.height = `${(height / max) * this._squareWrapperSize}px`;

            const squaresCount = ((width / result) * height) / result;
            const squareSizePx = (result / max) * this._squareWrapperSize;

            for (let i = 0; i < squaresCount; i++) {
                const square = document.createElement('div');
                square.style.width = square.style.height = `${squareSizePx}px`;
                square.classList.add('square');
                graphElem.appendChild(square);
            }
        } else {
            resultElem.textContent = '';
            graphElem.style.display = 'none';
        }
    }
}

customElements.define('divide-conquer-component', DivideConquerComponent);
