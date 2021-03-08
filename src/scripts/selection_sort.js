(() => {
    let unsortedArray = [];
    const arrayLength = 30;

    window.addEventListener('DOMContentLoaded', () => addGenerateButtonEventListener());
    window.addEventListener('DOMContentLoaded', () => addSortButtonEventListener());

    function addGenerateButtonEventListener() {
        document.querySelector('.selection-sort .action-button.generate').addEventListener('click', () => {
            unsortedArray = Array(arrayLength)
                .fill()
                .map(() => Math.ceil(Math.random() * arrayLength));

            document.querySelector(
                '.selection-sort .array',
            ).textContent = `Unsorted array (${arrayLength} items): [${unsortedArray.join(', ')}]`;

            document.querySelector('.selection-sort .action-button.sort').removeAttribute('disabled');
            document.querySelector('.selection-sort .result').innerHTML = '';
        });
    }

    function addSortButtonEventListener() {
        document.querySelector('.selection-sort .action-button.sort').addEventListener('click', () => {
            sort();
        });
    }

    function sort() {
        const sortedArray = [];
        let totalSteps = 0;
        for (let i = 0; i < arrayLength; i++) {
            const { minIndex, steps } = findMin(unsortedArray);
            totalSteps += steps;
            sortedArray.push(unsortedArray.splice(minIndex, 1));
        }

        document.querySelector('.selection-sort .result').innerHTML = `Sorted array (${
            sortedArray.length
        } items): [${sortedArray.join(' ,')}].<br> This algorithm took ${totalSteps} steps to find the result.`;
        document.querySelector('.selection-sort .action-button.sort').setAttribute('disabled', true);
    }

    function findMin(array) {
        let steps = 0;
        let minIndex = 0;
        let min = array[minIndex];

        for (let i = minIndex + 1; i < array.length; i++) {
            steps += 1;
            if (array[i] < min) {
                minIndex = i;
                min = array[i];
            }
        }

        return { minIndex, steps };
    }
})();
