// https://stackoverflow.com/questions/10946880/sort-a-dictionary-or-whatever-key-value-data-structure-in-js-on-word-number-ke
sortDictionary = (oldDict) => {
    let sorted = [];
    for (let key in oldDict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();
    let dict = {};
    for (let i = 0; i < sorted.length; i++) {
        dict[sorted[i]] = oldDict[sorted[i]];
    }
    return dict;
};

module.exports = sortDictionary;