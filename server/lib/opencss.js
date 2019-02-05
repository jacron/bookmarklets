const { exec } = require('child_process');

const cssPath = '/Users/orion/PhpstormProjects/bookmarklets/scripts/reader/css/';

const opencss = name => {
    const path = cssPath +  `sites/${name}.css`;
    exec('pstorm ' + path, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
    });

};

module.exports = opencss;