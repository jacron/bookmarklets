const fs = require("fs");

exports.writeCss = (host) => {
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
};
