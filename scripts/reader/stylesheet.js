function injectStylesheets(site, element) {
    const defaultStyle = loadStylesheet('default', 'default');
    let siteStyle = null;
    let darkStyle = null;
    if (element === 'article' && localStorage.getItem('darkmode') === 'on') {
        darkStyle = loadStylesheet('dark', 'dark');
    }
    if (element === 'body' && localStorage.getItem('bodydarkmode') === 'on') {
        document.body.className = 'dark';
        darkStyle = loadStylesheet('dark', 'bodydark');
    }
    if (site.style) {
        siteStyle = loadStylesheet(site.host, site.host, 'sites/');
    }
    const fragment = document.createDocumentFragment();
    fragment.appendChild(defaultStyle);
    if (siteStyle) { fragment.appendChild(siteStyle); }
    if (darkStyle) { fragment.appendChild(darkStyle); }
    document.getElementsByTagName('head')[0].appendChild(fragment);
}

function loadStylesheet(name, id, subdir) {
    const link = document.createElement( "link" );
    if (!subdir) subdir = '';
    link.href = `${scriptpath}css/${subdir}${name}.css`;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";
    link.id = id;
    return link;
}

function removeStylesheet(id) {
    const style = document.getElementById(id);
    if (style) {
        style.parentNode.removeChild(style);
    }
}

