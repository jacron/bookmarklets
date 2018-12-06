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
 * NB dit is een eenvoudiger oplossing dan mijn reader.text met zijn drukke back-end
 * activiteiten.
 */
'use strict';

(function(){
    const styles = {
        article: 'box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 12px 3px;; ' +
        'padding: 30px 60px; min-height: 100%; margin: 22px auto 0 auto; max-width: 94ex;' +
        'background-color:rgba(250,250,240,0.99);',
        container: 'height: calc(100% - 44px); font-family: Georgia;'
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
        }
    ];

    function getSite(host) {
        for (var i = 0; i < sites.length; i++) {
            if (sites[i].host === host) {
                return sites[i];
            }
        }
        return null;
    }

    function replaceBodyByText(site) {
        const
            header = document.querySelector(site.selector.header),
            content = document.querySelector(site.selector.body),
            container = document.createElement('div'),
            article = document.createElement('div')
        ;
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
            var article_empty = true;
            if (node) {
                if (style) {
                    node.setAttribute('style', style);
                }
                article.appendChild(node);
                article_empty = false;
            } else {
                console.log(site.selector[i] + ' is not a node');
            }
        }
        if (!article_empty) {
            container.appendChild(article);
            container.setAttribute('style', styles.container);
            article.setAttribute('style', styles.article);
            document.body.innerHTML = container.innerHTML;
            document.body.setAttribute('style', styles.container);
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
    }

}());
