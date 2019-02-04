const express = require('express');
const sites = require('../scripts/reader/sites');
const dictsort = require('./lib/sort-dictionary');
const bodyparser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3003;

app.use(express.static('public'));
app.use(bodyparser.urlencoded({msExtendedCode: false}));
app.use(bodyparser.json());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'reader 1.0',
        message: 'Hallo daar',
        sites: dictsort(sites)
    });
});

app.post('/', (req, res) => {
    // console.log(req.body.name);
    //               /Users/orion/PhpstormProjects/bookmarklets/scripts/reader/css/sites/fd.nl.css
    const cssPath = `/Users/orion/PhpstormProjects/bookmarklets/scripts/reader/css/sites/${req.body.name}.css`;
    console.log(cssPath);
    exec('webstorm ' + cssPath, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
    });
});

// open = (name) => {
//     console.log(name);
// };
app.listen(port, () => console.log(`http://localhost:3003 Reader2 listening on port ${port}!`))

