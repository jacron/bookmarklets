/*
 * Author: jan
 * Date: 6-dec-2018
 * http://jslint.com
 *
 * this file is dependent on reader.sites.js and reader.themes.js
 * these have to be loaded before this one, async or not
 */


const Nodes = function(nodes) {
    this.get = selector => {
        for (let i = 0; i < selector.length; i++) {
            let sel = selector[i];
            let optional = false;
            if (sel[0] === '@') {
                sel = sel.substr(1);
                optional = true;
            }
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
                if (!optional) {
                    nodes = [];
                    break;
                }
            }
        }
        return this;
    };

    this.injectArticle = short_host => {
        if (nodes.length > 0) {
            document.body.innerHTML = '';
            injectStylesheets(short_host, 'article');
            const container = createContainer(nodes);
            document.body.innerHTML = container.innerHTML;
            document.getElementById('readerarticle').className = 'dark';
            addEventToggleArticle();
            addEventReset();
        } else {
            console.log('No content for reader found');
            injectStylesheets(short_host, 'body');
            injectToggleButton();
            addEventToggleBody();
        }
        return this;
    };

};

function themeSite() {
    const short_host = location.host.replace('www.', '');
    let selector = sites[short_host];
    if (selector) {
        new Nodes([])
            .get(selector)
            .injectArticle(short_host);
    }
}
