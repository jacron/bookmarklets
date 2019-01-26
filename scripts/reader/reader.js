/*
 * Author: jan
 * Date: 6-dec-2018
 * http://jslint.com
 *
 * this file is dependent on reader.sites.js and reader.themes.js
 * these have to be loaded before this one, async or not
 */

const scriptpath = 'https://bookmarklets/scripts/reader/';

function getSelector(selector) {
    let style = null;
    // sommige sites, bijv. Trouw, hebben een specifieke style bij een selector
    if (Array.isArray(selector)) {
        if (selector.length === 2) {
            style = selector[1];
            selector = selector[0];
        } else {
            console.log(selector, 'format error');
        }
    }
    return {selector, style}
}

function getNodes(site) {
    const nodes = [];
    for (let i = 0; i < site.selector.length; i++) {
        const selectorSet = getSelector(site.selector[i]);
        const node = document.querySelector(selectorSet.selector);
        if (node) {
            if (selectorSet.style) {
                node.setAttribute('style', selectorSet.style);
            }
            nodes.push(node);
        } else {
            console.log(site.selector[i] + ' is not a node');
            // return [];
        }
    }
    return nodes;
}

function createToggleButton() {
    const
        cmdcontainer = document.createElement('div'),
        cmdbutton = document.createElement('div');
    cmdbutton.id = 'cmdtoggle';
    cmdbutton.innerHTML = 'o';
    cmdbutton.setAttribute('title', 'Toggle dark mode');
    cmdcontainer.className = 'cmdcontainer';
    cmdcontainer.appendChild(cmdbutton);
    return cmdcontainer;
}

function injectToggleButton() {
    const button = createToggleButton();
    button.className = 'standalone';
    document.body.appendChild(button);
}

function loadStylesheet(name, id) {
    const link = document.createElement( "link" );
    link.href = `${scriptpath}css/${name}.css`;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    link.id = id;
    return link;
}

function removeStylesheet(id) {
    const style = document.getElementById(id);
    if (style) {
        style.parentNode.removeChild(style);
    }
}

function toggleArticleDarkMode() {
    if (localStorage.getItem('darkmode') !== 'on') {
        const style = loadStylesheet('dark', 'dark');
        document.getElementsByTagName('head')[0].appendChild(style);
        localStorage.setItem('darkmode', 'on');
        document.getElementById('readerarticle').className = 'dark';
    } else {
        localStorage.setItem('darkmode', 'off');
        removeStylesheet('dark');
        document.getElementById('readerarticle').className = '';
    }
}

function toggleBodyDarkMode() {
    const bodydarkmode = localStorage.getItem('bodydarkmode');
    console.log(bodydarkmode);
    if (!bodydarkmode || bodydarkmode !== 'on') {
        const style = loadStylesheet('dark', 'bodydark');
        document.getElementsByTagName('head')[0].appendChild(style);
        localStorage.setItem('bodydarkmode', 'on');
        // stylesheet will use the article class
        document.body.className = 'dark';
    } else {
        localStorage.setItem('bodydarkmode', 'off');
        removeStylesheet('bodydark');
        document.body.className = '';
    }
}

function createContainer(nodes) {
    const container = document.createElement('div');
    container.className = 'content-container';
    const article = document.createElement('div');
    article.appendChild(createToggleButton());
    article.id = 'readerarticle';
    for (let i = 0; i < nodes.length; i++) {
        article.appendChild(nodes[i]);
    }
    container.appendChild(article);
    return container;
}

function injectNodes(nodes) {
    const container = createContainer(nodes);
    document.body.innerHTML = container.innerHTML;
}

function addEventToggleArticle() {
    document.body.addEventListener('click', function (ev) {
        if (ev.target['id'] === 'cmdtoggle') {
            toggleArticleDarkMode();
        }
    });
}

function addEventToggleBody() {
    document.body.addEventListener('click', function (ev) {
        if (ev.target['id'] === 'cmdtoggle') {
            toggleBodyDarkMode();
        }
    });
}

function injectStylesheets(site, element) {
    const defaultStyle = loadStylesheet('default', 'default');
    let siteStyle = null;
    let darkStyle = null;
    if (element === 'article' && localStorage.getItem('darkmode') === 'on') {
        darkStyle = loadStylesheet('dark', 'dark');
    }
    if (element === 'body' && localStorage.getItem('bodydarkmode') === 'on') {
        document.body.className = 'dark';
        darkStyle = loadStylesheet('dark', 'dark');
    }
    if (site.style) {
        siteStyle = loadStylesheet(site.style, site.style);
    }
    const fragment = document.createDocumentFragment();
    fragment.appendChild(defaultStyle);
    if (siteStyle) { fragment.appendChild(siteStyle); }
    if (darkStyle) { fragment.appendChild(darkStyle); }
    document.getElementsByTagName('head')[0].appendChild(fragment);
}

function injectArticle(nodes, site) {
    document.body.innerHTML = '';
    injectStylesheets(site, 'article');
    injectNodes(nodes);
    document.getElementById('readerarticle').className = 'dark';
    addEventToggleArticle();
}

function bodyDark(site) {
    injectStylesheets(site, 'body');
    injectToggleButton();
    addEventToggleBody();
}

function themeSite(site) {
    const nodes = getNodes(site);
    if (nodes.length > 0) {
        injectArticle(nodes, site);
    } else {
        // console.log('No content for reader found');
        bodyDark(site);
    }
}

function createHostsTable() {
    const table = document.createElement('table');
    getSites().forEach(site => {
        const row = document.createElement('tr');
        const data = document.createElement('td');
        data.innerText = site.host;
        row.appendChild(data);
        table.appendChild(row);
    });
    return table;
}

function run() {
    console.log(location.host);
    const site = getSite(location.host);
    // console.log(site);
    if (site) {
        themeSite(site);
    }
    // provisionary showing the list of hosts
    const hostsTable = createHostsTable();
    document.body.appendChild(hostsTable);
}

run();
