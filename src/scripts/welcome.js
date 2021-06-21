const welcomeTemplate = document.createElement('template');

welcomeTemplate.innerHTML = `
    <link rel="stylesheet" href="assets/css/welcome.css" />
    <div class="title">
        <img src="assets/book.jpg" />
        <div class="description">
            <span class="welcome">Welcome!</span><br>
            This project is dedicated to the book <a href="https://www.amazon.com/Grokking-Algorithms-illustrated-programmers-curious/dp/1617292230" target="blank">Grokking Algorithms by Aditya Y. Bhargava</a>, describes and
            implements algorithms from the book. Each presented example in the book includes code samples in
            Python. In this project all algorithms were implemented in pure JavaScript.<br />
            Each section includes short description of algorithm, dynamic example (you dynamically generate
            input parameters), result of the algorithm and link to implementation in GitHub.<br />
            The project is implemented using native web technologies (HTML+CSS+JS) including Web Components,
            so you can <a href="https://github.com/ResidentTGT/GrokkingAlgorithms" target="blank">download repository</a>, open index.html in browser and everything will work!<br />
            <span class="welcome">Good luck grokking algorithms!</span>
        </div>
    </div>
    `;

class WelcomeComponent extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(welcomeTemplate.content.cloneNode(true));
    }
}

customElements.define('welcome-component', WelcomeComponent);
