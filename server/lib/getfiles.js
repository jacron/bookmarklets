const fs = require("fs");
const {sitesPath} = require('./path');

const getfiles = () => {
    const files = fs.readdirSync(sitesPath);
    let dict = {};

    files.forEach(file => {
        let sel = fs.readFileSync(sitesPath + file, 'utf8');
        const pos = sel.indexOf('[');
        sel = sel.substr(pos)
            .replace(/'/g, '"')
            .replace(';', '');
        dict[file.replace('.js', '')] = JSON.parse(sel);
    });
    // console.log(dict);
    return dict;
};

module.exports = getfiles;