/*
 * Author: jan
 * Date: 6-dec-2018
 * http://jslint.com
 *
 * Weer eens een poging om een artikel op een (kranten)website leesbaar te presenteren.
 * Met een schuin oog naar Reader View van Safari.
 * Chrome kan advertenties beter blokkeren dan Safari.
 * Misschien is deze reader nog mooier dan die van Safari.
 * Hij past zich aan aan de host.
 * NB dit is een eenvoudiger en snellere oplossing dan mijn reader.text met zijn drukke back-end
 * activiteiten.
 */
'use strict';

(function(){
    const styles = {
        article: 'box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 12px 3px;; ' +
        'padding: 30px 60px; ' +
        'min-height: 100%; ' +
        'margin: 22px auto 0 auto; ' +
        'max-width: 94ex;' +
        'background-color:rgba(250,250,240,0.99);',
        article2:'box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 12px 3px;; ' +
        'padding: 30px 60px; ' +
        // 'min-height: 100%; ' +
        'margin: 22px auto 0 auto; ' +
        'max-width: 800px;' +
        'background-color:rgba(250,250,240,0.99);',
        body: 'height: calc(100% - 44px); font-family: Georgia;',
        closer: 'display: inline-block;float: right; cursor:pointer; padding: 4px;'
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
                '.content__head',
                ['.content__article-body', 'font-size: 20px; line-height: 28px;']
            ]
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
            article_style: 'article2'
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
        }
    ];
    var saved_body = null;

    function getSite(host) {
        for (var i = 0; i < sites.length; i++) {
            if (sites[i].host === host) {
                return sites[i];
            }
        }
        return null;
    }

    function getNodes(site) {
        var nodes = [];
        for (var i = 0; i < site.selector.length; i++) {
            var selector = site.selector[i];
            var style = null;
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

    function getArticleStyle(site) {
        if (site && site.article_style) {
            return styles[site.article_style];
        }
        return styles.article;
    }

    function createCloser() {
        const
            closer = document.createElement('div');
        closer.id = 'closer';
        closer.setAttribute('style', styles.closer);
        closer.innerHTML = 'x';
        closer.setAttribute('title', 'Close');
        // waarom werkt dit niet?
        closer.addEventListener('click', function () {
            console.log(saved_body);
            if (saved_body) {
                document.body.innerHTML = saved_body;
            }
        });
        return closer;
    }

    function replaceContent(content, site) {
        const
            container = document.createElement('div'),
            article = document.createElement('div')
        ;
        // article.appendChild(createCloser());
        article.appendChild(content);
        container.appendChild(article);
        article.setAttribute('style', getArticleStyle(site));
        // saved_body = document.body.innerHTML;
        document.body.innerHTML = container.innerHTML;
        document.body.setAttribute('style', styles.body);
    }

    function replaceBodyByText(site) {
        const
            content = document.createElement('div'),
            nodes = getNodes(site)
        ;
        if (nodes.length > 0) {
            for (var i = 0; i < nodes.length; i++) {
                content.appendChild(nodes[i]);
            }
            replaceContent(content, site);
        } else {
            console.log('No content for reader found');
        }
    }

    function replaceBodyBySelection(sel) {
        var range = sel.getRangeAt(0),
            content = range.extractContents();

        replaceContent(content);
    }

    /*
     * Start here
     */
    const sel = getSelection(),
        text = sel.toString();

    // if (text.length) {
    //     replaceBodyBySelection(sel);
    // } else
    //     {
        const site = getSite(location.host);
        if (site) {
            replaceBodyByText(site);
        }
    // }
}());
