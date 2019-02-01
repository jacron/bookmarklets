const fs = require("fs");
const sitesFile = 'scripts/reader/sites.js';

function writeCss(host) {
    const cssFile = 'scripts/reader/css/sites/' + host + '.css';
    const templ = `/* ${host} */\n`;
    fs.writeFile(cssFile, templ, { flag: 'wx'}, (err) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error(cssFile + ' already exists');
            }
            throw err;
        }
        console.log(cssFile + ' was saved');
    });
}

function insertHost(data, host) {
    const pos = data.indexOf('}');
    return data.substr(0, pos) +
        `    '${host}': [\n    ],\n` + data.substr(pos);
}

function writeHostInSites(data) {
    fs.writeFile(sitesFile, data, (err) =>
    {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(sitesFile + ' was saved');
    })
}

function writeInSites(host) {
    fs.readFile(sitesFile, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        const idata = insertHost(data, host);
        writeHostInSites(idata);
        writeCss(host);
    });
}

exports.processHost = (host) => {
    console.log(host);
    writeInSites(host);
    // writeCss(host);
};

