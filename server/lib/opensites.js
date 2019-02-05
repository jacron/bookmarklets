const { exec } = require('child_process');

const sitesPath = '/Users/orion/PhpstormProjects/bookmarklets/scripts/reader/sites.js';

const opensites = () => {
    exec('pstorm ' + sitesPath, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
    });

};

module.exports = opensites;