(() => {
    const array = [...Array(1000).keys()];
    const minValue = 0;
    const maxValue = 999;

    window.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.binary-search .action-button').addEventListener('click', () => {
            const input = document.querySelector('.binary-search .item-input')?.value;
            binarySearch(input);
        });
    });

    function binarySearch(input) {
        if (!isValidInput(input)) {
            return;
        }

        const value = +input;

        let startIndex = 0;
        let endIndex = array.length - 1;

        let step = 1;

        let isFound = false;

        while (!isFound) {
            const guessIndex = Math.trunc((startIndex + endIndex) / 2);
            const guess = array[guessIndex];

            if (value > guess) {
                startIndex = guessIndex + 1;
            } else if (value < guess) {
                endIndex = guessIndex - 1;
            } else {
                isFound = true;
                break;
            }

            step += 1;
        }

        showResult(step);
    }

    function isValidInput(input) {
        const value = +input;

        if (!input || isNaN(value) || !Number.isInteger(value) || value < minValue || value > maxValue) {
            showError();
            showResult();
            return false;
        } else {
            showError(false);
            return true;
        }
    }

    function showError(show = true) {
        const errorElem = document.querySelector('.binary-search .error');

        if (show) {
            errorElem.classList.add('show');
        } else {
            errorElem.classList.remove('show');
        }
    }

    function showResult(result) {
        const resultElem = document.querySelector('.binary-search .result');

        if (result) {
            resultElem.textContent = `This algorithm took ${result} steps to find the result.`;
        } else {
            resultElem.textContent = '';
        }
    }
})();
