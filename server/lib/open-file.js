const { exec } = require('child_process');
const {cssPath, sitesPath} = require('./path');

openFile = (path, success) => {
    exec('pstorm ' + path, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return 'Fout bij openen PHPStorm';
        }
    });
    return success;
};

const opencss = name => {
    return openFile(
        cssPath +  `sites/${name}.css`,
        'Geopend in PHPStorm: ' + name + '.css'
    );
};

const opensites = () => {
    return openFile(
        sitesPath,
        'sites.js geopend in PHPStorm'
    );
};

module.exports = {opencss, opensites};