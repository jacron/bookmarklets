const themes = {
    defaulttheme:
        `
#cmdtoggle,
#cmdclose {
    display: inline-block;
    cursor: pointer; 
    padding: 4px 10px; 
    border-radius: 6px;
    z-index: 1; 
    font-weight: bold;
}
#cmdtoggle {
    margin: 0 -44px 0 0;
}
#cmdclose {
    margin: 0 -64px 0 0;
}
#cmdtoggle:hover,
#cmdclose:hover {
    background-color: #cfcfcf; 
}
.cmdcontainer{
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
#cmdtoggle:hover,
#cmdclose:hover {
    background-color: #666; 
}
#cmdtoggle,
#cmdclose {
    color: #eff;
}
#readerarticle a { 
    color: rgb(90, 200, 250) !important; 
    text-decoration: none; 
    border-bottom: none !important;
}
#readerarticle p, 
#readerarticle h1, 
#readerarticle h2, 
#readerarticle h3, 
#readerarticle i, 
#readerarticle time, 
#readerarticle figcaption, 
#readerarticle figcaption span,
#readerarticle footer, 
#readerarticle blockquote {
    color: rgba(255, 255, 255, 0.780392); 
}
body {
    background-color: rgba(0, 0, 0, 0.76); 
}
#readerarticle { 
    background-color: rgba(174, 174, 177, 0.20) !important;
    box-shadow: 0px 6px 12px 3px rgba(0, 0, 0, 0.24); 
}
#readerarticle aside * {
    color: inherit;
}
.content-container {
    background-color: #666;
}
`
    , theguardian:
        `
#readerarticle {
    max-width: 440px;
}
#readerarticle.dark .rich-link__link {
    color: inherit;
}
#readerarticle .rich-link__byline,
#readerarticle .rich-link__read-more-text {
    color: #e05e00;
}
#readerarticle.dark aside * {
    color: #333;
}
div.content__article-body {
    font-size: 16px !important;
    line-height: 24px !important;
}
`
    , stackoverflow: `
#readerarticle {
    max-width: 780px;
    min-height: initial;
}
.dark blockquote, 
.dark code,
.dark .owner,
.dark #tabs a,
.dark .post-tag,
.dark textarea,
.dark .s-btn__primary {
    background-color: inherit;
}
.dark textarea {
    color: #eee;
}
.dark span,
.dark b {
    color: inherit;
}
.dark .question-status,
.dark .question-status b,
.dark .question-status p,
.dark .question-status span ,
.dark .question-status div {
    color: #333 !important;
}
.dark .comment-body {
    color: #eee;
}
`
    , trouw: `
.article__flex__right {
    margin: 0;
}
#readerarticle p {
    font-size: 24px;
    font-family: Georgia; 
}
#readerarticle {
    max-width: 820px;
}
.article__free-html-container {
    display: none;
}

`
    , volkskrant: `
.artstyle__main--container {
    margin-right: auto !important;
}
`
    , nytimes: `

#readerarticle {
    max-width: 490px;
    padding: 30px;
}
#readerarticle p {
    font-size: 15px !important;
}
section[name=articleBody] div {
    margin-left: 0;
}
figure div[data-testid] {
    display: none;
}
@media (min-width: 1024px) {
    .css-1ygdjhk {
        margin-left: -15px;
        margin-right: 0;
        width: 500px;
        max-width: initial;
    }
}
`
    , washingtonpost: `
#readerarticle p {
    font-size: 22px !important;
}
    
`
    , angulario: `

#readerarticle p {
    font-size: 18px !important;
}
.dark blockquote, 
.dark code,
.dark .owner,
.dark #tabs a,
.dark .post-tag,
.dark textarea,
.dark pre,
.dark aio-code,
.dark .s-btn__primary {
    background-color: inherit;
}
.dark aio-code {
  rgba(241,241,241,0.2) !important;
}
`
};
