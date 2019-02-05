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

filterDictionary = (oldDict, q) => {
    if (!q) {
        return oldDict;
    }
    let filtered = [];
    for (let key in oldDict) {
        if (oldDict.hasOwnProperty(key)) {
            if (key.indexOf(q) !== -1) {
                filtered[filtered.length] = key;
            }
        }
    }
    let dict = {};
    for (let i = 0; i < filtered.length; i++) {
        dict[filtered[i]] = oldDict[filtered[i]];
    }
    return dict;
};

module.exports = {sortDictionary, filterDictionary};
