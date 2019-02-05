const fs = require("fs");

const {cssPath, sitesPath} = require('./path');
const {inDictionary}  = require('./dictionary');
const {opencss, opensites} = require('./open-file');

const insertHost = (data, host) => {
    const pos = data.indexOf('}');
    return data.substr(0, pos) +
        `    '${host}': [\n    ],\n` + data.substr(pos);
};

const writeSites = name => {
    const sitesJs = fs.readFileSync(sitesPath, 'utf8');
    const idata = insertHost(sitesJs, name);
    fs.writeFileSync(sitesPath, idata);
};

const writeCss = host => {
    const cssFile = cssPath + 'sites/' + host + '.css';
    const templ = `/* ${host} */\n`;
    if (fs.existsSync(cssFile)) {
        console.log(cssFile + ' bestaat al!');
        return;
    }
    fs.writeFileSync(cssFile, templ, 'utf8');
};

newsite = (name, sites) => {
    if (!name) {
        return 'De naam is niet ingevuld';
    }
    if (inDictionary(sites, name)) {
        return 'Deze host bestaat al';
    }
    writeSites(name);
    writeCss(name);
    opencss(name);
    opensites();
    return 'De website is toegevoegd: ' + name;
};

module.exports = newsite;