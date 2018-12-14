const themes = {
    defaulttheme:
        `
#cmdbutton {
    display: inline-block;
    cursor: pointer; 
    padding: 4px 10px; 
    border-radius: 6px;
    z-index: 1; 
    font-weight: bold;
    margin: 0 -32px 0 0;
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
#readerarticle p, 
#readerarticle h1, 
#readerarticle h2, 
#readerarticle i, 
#readerarticle div, 
#readerarticle time, 
#readerarticle figcaption, 
#readerarticle footer, 
#readerarticle blockquote {
    color: rgba(255, 255, 255, 0.780392); 
}
body {
    background-color: rgba(0, 0, 0, 0.76); 
}
#readerarticle { 
    background-color: rgb(174, 174, 177, 0.20) !important;
    box-shadow: 0px 6px 12px 3px rgba(0, 0, 0, 0.24); 
}
#readerarticle aside * {
    color: inherit;
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
.dark .s-btn__primary {
    background-color: inherit;
}
.dark code {
    color: #333;
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

`
    , trouw: `
.article__flex__right {
    margin: 0;
}
#readerarticle p {
    font-size: 22px;
}
#readerarticle {
    max-width: 820px;
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
`
};
