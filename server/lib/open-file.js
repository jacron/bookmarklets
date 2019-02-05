const fs = require("fs");
const { exec } = require('child_process');
const {cssPath, sitesPath} = require('./path');

const deleteFile = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        return true;
    }
    return false;
};

const openFile = (path, success) => {
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
        name + '.css is geopend in PHPStorm'
    );
};

// const watch = file => {
//     fs.watch(file, (evtType, filename) => {
//         console.log(evtType, filename);
//     });
// };

const openselector = name => {
    const file = sitesPath +  `${name}.js`;
    // watch(file);
    return openFile(
        file,
        name + '.js is geopend in PHPStorm'
    );
};

const deleteSite = name => {
    const siteFile = sitesPath +  `${name}.js`;
    const cssFile = cssPath +  `sites/${name}.css`;
    if (!deleteFile(siteFile)) {
        return name + ' bestaat niet';
    }
    if (!deleteFile(cssFile)) {
        return name + ' bestaat niet';
    }
    return name + ' is verwijderd';
};

module.exports = {opencss, openselector, deleteSite};