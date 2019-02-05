// globals
const scriptpath = 'https://bookmarklets/scripts/reader/';
let selector;

function loadScript(url, callback) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = url;
    // s.onreadystatechange = callback;
    s.onload = callback;
    s.onerror = onError;
    document.head.appendChild(s);
}

function onError(err) {
    console.log(err);
}

// function loadSite() {
//     short_host = location.host.replace('www.', '');
//     const filename = `${scriptpath}sites/${short_host}.js`;
//     loadScript(filename, themeSite);
// }

function goAhead() {
    themeSite();
}

function loadSelector() {
    const short_host = getShortHost();
    const site_path = `${scriptpath}sites/${short_host}.js`;
    loadScript(site_path, goAhead);
}

function loadReader() {
    loadScript(`${scriptpath}reader.js`, loadSelector);
}

// function loadSites() {
//     loadScript(`sites.js`, loadReader);
// }

function loadCmd() {
    loadScript(`${scriptpath}cmd.js`, loadReader);
}

function loadStylesheetJs() {
    loadScript(`${scriptpath}stylesheet.js`, loadCmd);
}

function loadCreateJs() {
    loadScript(`${scriptpath}create.js`, loadStylesheetJs);
}

function run() {
    // console.log(location);
    console.log(location.host);
    if (location.hostname !== 'localhost' &&
        location.hostname.indexOf('0.0.') === -1 &&
        location.search.indexOf('?noreader') === -1) {
        // load create.js, stylesheet.js, cmd.js, reader.js, [site].js
        // NB don't change the order of these
        loadCreateJs();
    }
}

run();