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
    const sites = getSites();
    for (let i = 0; i < sites.length; i++) {
        if (sites[i].host === host) {
            return sites[i];
        }
    }
    return null;
}

function getNodes(site) {
    const nodes = [];
    for (let i = 0; i < site.selector.length; i++) {
        let selector = site.selector[i];
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
        const node = document.querySelector(selector);
        if (node) {
            if (style) {
                node.setAttribute('style', style);
            }
            nodes.push(node);
        } else {
            console.log(site.selector[i] + ' is not a node');
        }
    }
    return nodes;
}

function createCmdButton() {
    const
        cmdcontainer = document.createElement('div'),
        cmdbutton = document.createElement('div');
    cmdbutton.id = 'cmdbutton';
    cmdbutton.innerHTML = 'o';
    cmdbutton.setAttribute('title', 'Toggle dark mode');
    cmdcontainer.id = 'cmdcontainer';
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
    document.getElementsByTagName('head')[0].appendChild(style);
}

function removeStylesheet(id) {
    const style = document.getElementById(id);
    if (style) {
        style.parentNode.removeChild(style);
    }
}

function toggleDarkMode() {
    if (localStorage.getItem('darkmode') !== 'on') {
        createStylesheet(themes.darktheme, 'dark');
        localStorage.setItem('darkmode', 'on');
        // stylesheet will use the article class
        document.getElementById('readerarticle').className = 'dark';
    } else {
        localStorage.setItem('darkmode', 'off');
        removeStylesheet('dark');
        document.getElementById('readerarticle').className = '';
    }
}

function createArticle(content) {
    const article = document.createElement('div');
    article.appendChild(createCmdButton());
    article.appendChild(content);
    article.id = 'readerarticle';
    return article;
}

function replaceContent(content) {
    // container will replace body
    const container = document.createElement('div');
    container.appendChild(createArticle(content));
    document.body.innerHTML = container.innerHTML;
    document.body.addEventListener('click', function (ev) {
        if (ev.target['id'] === 'cmdbutton') {
            toggleDarkMode();
        }
    });
}

function replaceBodyByText(site) {
    const
        content = document.createElement('div'),
        nodes = getNodes(site)
    ;
    if (nodes.length > 0) {
        for (let i = 0; i < nodes.length; i++) {
            content.appendChild(nodes[i]);
        }
        replaceContent(content);
    } else {
        console.log('No content for reader found');
    }
}

function run() {
    const site = getSite(location.host);
    console.log(site);
    if (site) {
        replaceBodyByText(site);
        createStylesheet(themes.defaulttheme, 'default');
        if (localStorage.getItem('darkmode') === 'on') {
            createStylesheet(themes.darktheme, 'dark');
            // stylesheet will use the article class
            document.getElementById('readerarticle').className = 'dark';
        }
        if (site.style) {
            if (themes[site.style]) {
                createStylesheet(themes[site.style]);
            } else {
                console.log('missing style: ' + site.style);
            }
        }
    }
}

run();
