function shuffleArray(array) {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

function generateRandomInteger(from, to) {
    if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || from >= to) {
        return;
    }
    return Math.trunc(from + (to - from + 1) * Math.random());
}
