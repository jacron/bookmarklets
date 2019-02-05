const express = require('express');
const bodyparser = require('body-parser');
const getfiles = require('./lib/getfiles');
const {opencss, openselector, deleteSite} = require('./lib/open-file');
const newsite = require('./lib/newsite');

const app = express();
const port = 3003;
const appTitle = 'reader config 1.0';

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use('/favicon.ico', express.static('public/favicon.ico'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const items = getfiles();
    // res.send('testing (get). . . ');
    res.render('index', {
        title: appTitle,
        message: '',
        sites: items
    });
});

app.post('/', (req, res) => {
    const cmd = req.body.cmd;
    const name = req.body.name;
    let message, cssopened, selectoropened, deleted;
    switch(cmd) {
        case 'editcss':
            message = opencss(name);
            cssopened = name;
            break;
        case 'editselector':
            message = openselector(name);
            selectoropened = name;
            break;
        case 'newsite':
            message = newsite(name);
            break;
        case 'delete':
            message = deleteSite(name);
            deleted = name;
            break;
    }
    // res.send('testing (post). . . ');
    res.render('index', {
        cssopened,
        selectoropened,
        title: appTitle,
        message,
        sites: getfiles()
    });
});

app.listen(port, () => console.log(`http://localhost:3003 Reader2 listening on port ${port}!`));

