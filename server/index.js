const express = require('express');
const bodyparser = require('body-parser');
const sites = require('../scripts/reader/sites');
const dictsort = require('./lib/sort-dictionary');
const opencss = require('./lib/opencss');
const opensites = require('./lib/opensites');

const app = express();
const port = 3003;

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
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
    const submit = req.body.submit;
    let message;
    if (submit === 'css') {
        opencss(req.body.name);
        message = 'Geopend in PHPStorm: ' + req.body.name + '.css';
    }
    if (submit === 'sites') {
        opensites();
        message = 'sites.js geopend in PHPStorm';
    }
    res.render('index', {
        title: 'reader 1.0',
        message: message,
        sites: dictsort(sites)
    });
});

app.listen(port, () => console.log(`http://localhost:3003 Reader2 listening on port ${port}!`));

