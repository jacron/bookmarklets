function injectToggleButton() {
    const button = createToggleButton();
    button.className = 'standalone';
    document.body.appendChild(button);
}

function toggleArticleDarkMode() {
    if (localStorage.getItem('darkmode') !== 'on') {
        const style = loadStylesheet('dark', 'dark');
        document.getElementsByTagName('head')[0].appendChild(style);
        localStorage.setItem('darkmode', 'on');
        document.getElementById('readerarticle').className = 'dark';
    } else {
        localStorage.setItem('darkmode', 'off');
        removeStylesheet('dark');
        document.getElementById('readerarticle').className = '';
    }
}

function toggleBodyDarkMode() {
    const bodydarkmode = localStorage.getItem('bodydarkmode');
    // console.log(bodydarkmode);
    if (!bodydarkmode || bodydarkmode !== 'on') {
        const style = loadStylesheet('dark', 'bodydark');
        document.getElementsByTagName('head')[0].appendChild(style);
        localStorage.setItem('bodydarkmode', 'on');
        document.body.className = 'dark';
    } else {
        localStorage.setItem('bodydarkmode', 'off');
        removeStylesheet('bodydark');
        console.log(document.body.className);
        document.body.className = '';
    }
}

function addEventToggleArticle() {
    document.body.addEventListener('click', function (ev) {
        if (ev.target['id'] === 'cmdtoggle') {
            toggleArticleDarkMode();
        }
    });
}

function addEventToggleBody() {
    document.body.addEventListener('click', function (ev) {
        if (ev.target['id'] === 'cmdtoggle') {
            toggleBodyDarkMode();
        }
    });
}

function addEventReset() {
    document.body.addEventListener('click', function (ev) {
        if (ev.target['id'] === 'cmdreset') {
            document.location.href += '?noreader';
        }
    });
}