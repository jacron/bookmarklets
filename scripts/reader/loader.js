// globals
const scriptpath = 'https://bookmarklets/scripts/reader/';

function loadScript(url, callback) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = scriptpath + url;
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

function loadReader() {
    loadScript(`reader.js`, goAhead);
}

function loadSites() {
    loadScript(`sites.js`, loadReader);
}

function loadCmd() {
    loadScript(`cmd.js`, loadSites);
}

function loadStylesheetJs() {
    loadScript(`stylesheet.js`, loadCmd);
}

function loadCreateJs() {
    loadScript(`create.js`, loadStylesheetJs);
}

function run() {
    // console.log(location);
    console.log(location.host);
    if (location.search.indexOf('?noreader') === -1) {
        // load create.js, stylesheet.js, cmd.js, reader.js, [site].js
        // NB don't change the order of these
        loadCreateJs();
    }
}

run();