const fs = require("fs");
const {sitesPath} = require('./path');

const jsonify = s => {
    const pos = s.indexOf('[');
    return s.substr(pos)
        .replace(/'/g, '"')
        .replace(';', '');
};

const getselector = (file) => {
    const content = fs.readFileSync(sitesPath + file, 'utf8');
    const sel = jsonify(content);
    try {
        return JSON.parse(sel);
    } catch(e) {
        if (e instanceof SyntaxError) {
            console.log(`[syntax error] ${e.name}: ${e.message}`);
        } else {
            console.log(`[unexpected error] ${e.name}: ${e.message}`);
        }
        console.log('getfiles.js: error with: ' + file);
    }
    return null;
};

const getfiles = () => {
    const files = fs.readdirSync(sitesPath); // already sorted (on mac)
    let dict = {};

    files.forEach(file => {
        if (file[0] !== '.') {
            selector = getselector(file);
            if (selector) {
                const index = file.replace('.js', '');
                dict[index] = selector;
            }
        }
    });
    return dict;
};

module.exports = getfiles;