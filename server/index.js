const express = require('express');
const bodyparser = require('body-parser');
const sites = require('../scripts/reader/sites');
const {sortDictionary, filterDictionary}  = require('./lib/dictionary');
const {opencss, opensites} = require('./lib/open-file');
const newsite = require('./lib/newsite');

const app = express();
const port = 3003;
const appTitle = 'reader config 1.0'

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use('/favicon.ico', express.static('public/favicon.ico'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const q = req.query.query;
    const items = filterDictionary(sortDictionary(sites), q);
    res.render('index', {
        query: q,
        title: appTitle,
        message: '',
        sites: items
    });
});

app.post('/', (req, res) => {
    const cmd = req.body.cmd;
    let message;
    let sitesopened = false;
    switch(cmd) {
        case 'editcss':
            message = opencss(req.body.name);
            break;
        case 'editsites':
            message = opensites();
            sitesopened = true;
            break;
        case 'newsite':
            message = newsite(req.body.name, sites);
            break;
    }
    res.render('index', {
        cssopened: req.body.name,
        sitesopened,
        title: appTitle,
        message,
        sites: sortDictionary(sites)
    });
});

app.listen(port, () => console.log(`http://localhost:3003 Reader2 listening on port ${port}!`));

