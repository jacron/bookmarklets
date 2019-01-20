/*
 * Author: jan
 * Date: 6-dec-2018
 * http://jslint.com
 *
 * this file is dependent on reader.sites.js and reader.themes.js
 * these have to be loaded before this one, async or not
 */

// const scriptpath = 'https://bookmarklets/scripts/reader/';

function getSite(host) {
    return getSites().find(site => site.host === host);
}

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

function createStylesheet(rules, id){
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = rules;
    if (id) {
        // so this style can be removed later
        style.id = id;
    }
    return style;
}

function removeStylesheet(id) {
    const style = document.getElementById(id);
    if (style) {
        style.parentNode.removeChild(style);
    }
}

function toggleDarkMode() {
    if (localStorage.getItem('darkmode') !== 'on') {
        const style = createStylesheet(themes.darktheme, 'dark');
        document.getElementsByTagName('head')[0].appendChild(style);
        localStorage.setItem('darkmode', 'on');
        // stylesheet will use the article class
        document.getElementById('readerarticle').className = 'dark';
    } else {
        localStorage.setItem('darkmode', 'off');
        removeStylesheet('dark');
        document.getElementById('readerarticle').className = '';
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

function addEvents() {
    document.body.addEventListener('click', function (ev) {
        if (ev.target['id'] === 'cmdtoggle') {
            toggleDarkMode();
        }
    });
}

function injectStylesheets(site) {
    const defaultStyle = createStylesheet(themes.defaulttheme, 'default');
    let siteStyle = null;
    let darkStyle = null;
    if (localStorage.getItem('darkmode') === 'on') {
        darkStyle = createStylesheet(themes.darktheme, 'dark');
        // stylesheet will use the article class
    }
    if (site.style) {
        if (themes[site.style]) {
            siteStyle = createStylesheet(themes[site.style]);
        } else {
            console.log('missing style: ' + site.style);
        }
    }
    const fragment = document.createDocumentFragment();
    fragment.appendChild(defaultStyle);
    if (siteStyle) { fragment.appendChild(siteStyle); }
    if (darkStyle) { fragment.appendChild(darkStyle); }
    document.getElementsByTagName('head')[0].appendChild(fragment);
}

function injectArticle(site) {
    const nodes = getNodes(site);
    if (nodes.length > 0) {
        document.body.innerHTML = '';
        injectStylesheets(site);
        injectNodes(nodes);
        document.getElementById('readerarticle').className = 'dark';
        addEvents();
    } else {
        console.log('No content for reader found');
    }
}

function run() {
    console.log(location.host);
    const site = getSite(location.host);
    // console.log(site);
    if (site) {
        injectArticle(site);
    }
}

run();
