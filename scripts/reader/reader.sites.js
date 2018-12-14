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
        ],
        style: 'nytimes'
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
        ],
        style: 'trouw'
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
        host: 'www.macworld.com',
        selector: [
            'h1[itemprop=headline]',
            'section.bodee'
        ]
    }
];

function getSites() {
    return sites;
}