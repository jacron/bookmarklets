const fs = require("fs");

const {cssPath, sitesPath} = require('./path');
const {opencss, openselector} = require('./open-file');

const writeFile = (file, templ, exists) => {
    if (fs.existsSync(file)) {
        console.log(exists);
        return {status: 300, message: exists};
    }
    fs.writeFileSync(file, templ, 'utf8');
    return {status: 200}
};

const writeSite = host => {
    const siteFile = sitesPath + host + '.js';
    return writeFile(
        siteFile,
        `selector = [\n];\n`,
        siteFile + ' bestaat al!'
    );
};

const writeCss = host => {
    const cssFile = cssPath + 'sites/' + host + '.css';
    return writeFile(
        cssFile,
        `/* ${host} */\n`,
        cssFile + ' bestaat al!'
    );
};

newsite = name => {
    if (!name) {
        return 'De naam is niet ingevuld';
    }
    const retSite = writeSite(name);
    if (retSite.status !== 200) {
        return retSite.message;
    }
    const retCss = writeCss(name);
    if (retCss.status !== 200) {
        return retCss.message;
    }
    opencss(name);
    openselector(name);
    return 'De website is toegevoegd: ' + name;
};

module.exports = newsite;