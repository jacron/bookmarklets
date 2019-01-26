const sites = [
    {
        host: 'www.ft.com',
        selector: [
            '.topper__headline',
            '.topper__standfirst',
            ['figure.topper__visual', ".main-image"],
            '.article__content-body'
        ],
        style: 'ft'
    },
    {
        host: 'www.theguardian.com',
        selector: [
            '.content__main-column',
        ],
        style: 'theguardian'
    },
    {
        host: 'www.nytimes.com',
        selector:[
            'main[id=site-content] header',
            'section[itemprop=articleBody]'
        ],
        style: 'nytimes'
    },
    {
        host: 'fd.nl',
        selector: [
            'article h1',
            'main .body',
        ],
        style: 'fd'
    },
    {
        host: 'www.trouw.nl',
        selector: [
            '.article__header__title',
            '.article__header__meta',
            'figure.article__cover',
            '.fjs-article__main'
        ],
        style: 'trouw'
    },
    {
        host: 'www.volkskrant.nl',
        selector: [
            'article.artstyle'
        ],
        main: true,
        style: 'volkskrant'
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
            '#mainbar',
        ],
        style: 'stackoverflow'
    },
    {
        host: 'www.washingtonpost.com',
        selector: [
            '#top-content',
            '#article-body'
        ],
        style: 'washingtonpost'
    },
    // {
    //     host: 'www.macworld.com',
    //     selector: [
    //         'h1[itemprop=headline]',
    //         'section.bodee'
    //     ]
    // },
    {
        host: 'angular.io',
        selector: [
            'aio-doc-viewer'
        ],
        style: 'angulario'
    },
    {
        host: 'www.reddit.com',
        selector: [
            '.gtq90r-3'
        ],
        style: 'reddit'
    }
];

function getSites() {
    return sites;
}

function getSite(host) {
    return sites.find(site => site.host === host);
}

