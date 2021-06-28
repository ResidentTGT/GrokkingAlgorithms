const dynamicTemplate = document.createElement('template');

dynamicTemplate.innerHTML = `
    <link rel="stylesheet" href="assets/css/algorithm.css" />
    <style> 
        .enter{
            margin: 15px 5px 0 0;
            display:inline-block;
        }
        .item-input{
            margin-right: 5px;
            width: 200px;
        }
    </style>
    <div class="description">
    Dynamic programming refers to simplifying a complicated problem by breaking it down into simpler sub-problems in a recursive manner. 
    While some decision problems cannot be taken apart this way, decisions that span several points in time do often break apart recursively.
    Likewise, in computer science, if a problem can be solved optimally by breaking it into sub-problems and then recursively finding the optimal solutions to the sub-problems, then it is said to have optimal substructure.<br>
    If sub-problems can be nested recursively inside larger problems, so that dynamic programming methods are applicable, then there is a relation between the value of the larger problem and the values of the sub-problems.
    </div>
    <div class="example-title">Example</div>
    <div class="condition">We will search for the longest common subsequence in 2 words.</div>
    <div class="enter">Enter 2 similar words: </div>
    <input class="item-input" type="text"  />
    <input class="item-input" type="text"  />
    <span class="error">Enter not empty strings!</span>
    <button class="action-button" >Find the longest subsequence!</button>
    <div class="result"></div>
    `;

class DynamicProgComponent extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(dynamicTemplate.content.cloneNode(true));

        this.$inputs = this.shadowRoot.querySelectorAll('.item-input');
        this.$actionButton = this.shadowRoot.querySelector('.action-button');
        this.$error = this.shadowRoot.querySelector('.error');
        this.$result = this.shadowRoot.querySelector('.result');
    }

    connectedCallback() {
        this.$actionButton.addEventListener('click', () => this.actionButtonClickHandler());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.action-button').removeEventListener();
    }

    actionButtonClickHandler() {
        const wordA = this.$inputs[0].value;
        const wordB = this.$inputs[1].value;
        if (!wordA || !wordB) {
            this.$error.classList.add('show');
            this.$result.textContent = '';
        } else {
            this.$error.classList.remove('show');
            const subsequence = this.findLongestCommonSubsequence(wordA, wordB);
            this.$result.textContent = `The longest common subsequence in '${wordA}' and '${wordB}' is ${
                subsequence[wordA.length - 1][wordB.length - 1]
            } symbols.`;
        }
    }

    findLongestCommonSubsequence(wordA, wordB) {
        const cell = [];
        for (let i = 0; i < wordA.length; i++) {
            cell.push([]);
            for (let j = 0; j < wordB.length; j++) {
                if (wordA[i] === wordB[j]) {
                    const prevValue = i !== 0 && j !== 0 ? cell[i - 1][j - 1] : 0;
                    cell[i][j] = prevValue + 1;
                } else {
                    const prevIValue = i !== 0 ? cell[i - 1][j] : 0;
                    const prevJValue = j !== 0 ? cell[i][j - 1] : 0;
                    cell[i][j] = Math.max(prevIValue, prevJValue);
                }
            }
        }

        return cell;
    }
}

customElements.define('dynamic-component', DynamicProgComponent);
