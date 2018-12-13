'use strict';

/*
 * Author: jan
 * Date: 6-dec-2018
 * http://jslint.com
 */

(function(){

    const themes = {
        defaulttheme:
    `
#cmdbutton {
    display: inline-block;
    cursor: pointer; 
    padding: 2px 8px; 
    border-radius: 6px;
    z-index: 1; 
    font-weight: bold;
}
#cmdbutton:hover {
    background-color: #cfcfcf; 
}
#cmdcontainer{
    width: 100%; 
    text-align: right;
}
blockquote {
    font-style: italic;
}
body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: transparent;
    height: calc(100% - 44px); 
    font-family: Georgia; 
    --body-font-color: rgba(255, 255, 255, 0.78);
    --horizontal-line-color: rgb(111, 111, 111);
}
body:after {
    content: "";
    height: 22px;
    display: block;
}
#readerarticle {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 6px 12px 3px; 
    padding: 30px 60px; 
    min-height: 100%; 
    margin: 22px auto 0 auto; 
    max-width: 660px;
    background-color:rgba(250,250,240,0.99);
}
`
        , darktheme:
    `
#cmdbutton:hover {
    background-color: #666; 
}
#readerarticle a { 
    color: rgb(90, 200, 250) !important; 
    text-decoration: none; 
    border-bottom: none !important;
}
#readerarticle p, span, body, 
#readerarticle h1, h2, i, 
#readerarticle div, time, figcaption, footer, blockquote {
    color: rgba(255, 255, 255, 0.780392); 
}
body {
    background-color: rgba(0, 0, 0, 0.76); 
}
#readerarticle { 
    background-color: rgb(174, 174, 177, 0.20) !important;
    box-shadow: 0px 6px 12px 3px rgba(0, 0, 0, 0.24); 
}
`
        , theguardian:
    `
#readerarticle {
    max-width: 440px !important;
}
`
        , stackoverflow: `
#readerarticle {
    max-width: 780px !important;
    min-height: initial !important;
}
blockquote, code {
    background-color: inherit;
}
`
    };

    const sites = [
        {
            host: 'www.ft.com',
            selector: [
                '.topper__headline',
                '.topper__standfirst',
                '.main-image',
                '.article__content-body'
            ]
        },
        {
            host: 'www.theguardian.com',
            selector: [
                '.content__headline-standfirst-wrapper',
                ['.content__article-body', 'font-size: 14px; line-height: 20px;']
            ],
            style: 'theguardian'
        },
        {
            host: 'www.nytimes.com',
            selector:[
                'main[id=site-content] header',
                'section[itemprop=articleBody]'
            ]
        },
        {
            host: 'fd.nl',
            selector: [
                ['article h1', 'font-size: 40px;'],
                ['main .body', 'font-size: 20px; line-height: 28px;']
            ]
        },
        {
            host: 'www.trouw.nl',
            selector: [
                ['.article__header__title', 'font-size: 26px; line-height: 36px;'],
                '.article__header__meta',
                'figure.article__cover',
                '.fjs-article__main'
            ]
        },
        {
            host: 'www.nrc.nl',
            selector: [
                '.intro-col',
                'figure.article__featured-image',
                '.article-container.main'
            ]
        },
        {
            host: 'stackoverflow.com',
            selector: [
                '#question-header',
                ['#mainbar', 'width: 100%']
            ],
            style: 'stackoverflow'
        },
        {
            host: 'www.washingtonpost.com',
            selector: [
                '#top-content',
                '#article-body'
            ]
        },
        {
            host: 'www.nytimes.com',
            selector: [
                'h1[itemprop=headline]',
                'section[itemprop=articleBody]'
            ]
        },
        {
            host: 'www.macworld.com',
            selector: [
                'h1[itemprop=headline]',
                'section.bodee'
            ]
        }
    ];

    function getSite(host) {
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
        style.id = id;
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
            localStorage.setItem('darkmode', 'on')
        } else {
            localStorage.setItem('darkmode', 'off');
            removeStylesheet('dark');
        }
    }

    function replaceContent(content, site) {
        const
            container = document.createElement('div'),
            article = document.createElement('div')
        ;
        article.appendChild(createCmdButton());
        article.appendChild(content);
        article.id = 'readerarticle';
        container.appendChild(article);
        if (site && site.style) {
            createStylesheet(themes[site.style], site.style);
        }
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
            replaceContent(content, site);
        } else {
            console.log('No content for reader found');
        }
    }

    /*
     * Start here
     */
    const site = getSite(location.host);

    if (site) {
        replaceBodyByText(site);
        createStylesheet(themes.defaulttheme, 'default');
        if (localStorage.getItem('darkmode') === 'on') {
            localStorage.setItem('darkmode', 'off');
            toggleDarkMode();
        }
    }
}());
