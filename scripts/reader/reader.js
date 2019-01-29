/*
 * Author: jan
 * Date: 6-dec-2018
 * http://jslint.com
 *
 * this file is dependent on reader.sites.js and reader.themes.js
 * these have to be loaded before this one, async or not
 */

const scriptpath = 'https://bookmarklets/scripts/reader/';

function getNodes(site) {
    const nodes = [];
    for (let i = 0; i < site.selector.length; i++) {
        const sel = site.selector[i];
        let node;
        if (Array.isArray(sel)) {
            for (let j = 0; j < sel.length; j++) {
                node = document.querySelector(sel[j]);
                if (node) break;
            }
        } else {
            node = document.querySelector(sel);
        }
        if (node) {
            nodes.push(node);
        } else {
            console.log(sel + ' is not a node');
            return [];
        }
    }
    return nodes;
}

function injectNodes(nodes) {
    const container = createContainer(nodes);
    document.body.innerHTML = container.innerHTML;
}

function injectArticle(nodes, site) {
    document.body.innerHTML = '';
    injectStylesheets(site, 'article');
    injectNodes(nodes);
    document.getElementById('readerarticle').className = 'dark';
    addEventToggleArticle();
    addEventReset();
}

function bodyDark(site) {
    injectStylesheets(site, 'body');
    injectToggleButton();
    addEventToggleBody();
}

function loadScript(url, callback) {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = url;
    s.onreadystatechange = callback;
    s.onload = callback;
    document.head.appendChild(s);
}

function themeSite() {
    const site = currentsite;
    const nodes = getNodes(site);
    if (nodes.length > 0) {
        injectArticle(nodes, site);
    } else {
        console.log('No content for reader found');
        bodyDark(site);
    }
}

function loadSite() {
    const filename = `${scriptpath}sites/${location.host}.js`;
    loadScript(filename, themeSite);
}

function loadCmd() {
    loadScript(`${scriptpath}cmd.js`, loadSite);
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
    // console.log(filename);
    if (location.search !== '?noreader') {
        // load create.js, stylesheet.js, cmd.js, [site].js
        // NB don't change the order of these
        loadCreateJs();
    }
}

run();
