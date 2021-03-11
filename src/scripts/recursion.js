(() => {
    const minValue = 1;
    const maxValue = 10;

    window.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.recursion .action-button').addEventListener('click', recursionClickHandler);
    });

    function recursionClickHandler() {
        const input = document.querySelector('.recursion .item-input')?.value;

        if (!isValidInput(input)) {
            return;
        }

        const factorial = calcFactorial(+input);

        showResult(input, factorial);
    }

    function calcFactorial(input) {
        if (input === 1) {
            return 1;
        } else {
            return input * calcFactorial(input - 1);
        }
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
        const errorElem = document.querySelector('.recursion .error');

        if (show) {
            errorElem.classList.add('show');
        } else {
            errorElem.classList.remove('show');
        }
    }

    function showResult(input, result) {
        const resultElem = document.querySelector('.recursion .result');

        if (result) {
            resultElem.textContent = `The factorial of ${input} is ${result}.`;
        } else {
            resultElem.textContent = '';
        }
    }
})();
