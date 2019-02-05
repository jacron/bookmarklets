function createButton(id, classNameContainer, content, title) {
    const
        cmdcontainer = document.createElement('div'),
        cmdbutton = document.createElement('div');
    cmdbutton.id = id;
    cmdbutton.innerHTML = content;
    cmdbutton.setAttribute('title', title);
    cmdcontainer.className = 'cmd-toggle-container';
    cmdcontainer.appendChild(cmdbutton);
    return cmdcontainer;
}

function createToggleButton() {
    return createButton(
        'cmdtoggle',
        'cmd-toggle-container',
        'o',
        'Toggle dark mode'
        );
}

function createResetButton() {
    return createButton(
        'cmdreset',
        'cmd-reset-container',
        'x',
        'Normal view'
    );
}

function createContainer(nodes) {
    const container = document.createElement('div');
    container.className = 'content-container';
    const article = document.createElement('div');
    article.appendChild(createToggleButton());
    article.appendChild(createResetButton());
    article.id = 'readerarticle';
    for (let i = 0; i < nodes.length; i++) {
        article.appendChild(nodes[i]);
    }
    container.appendChild(article);
    return container;
}

function getShortHost() {
    return location.host.replace('www.', '');
}

// function createHostsTable() {
//     const table = document.createElement('table');
//     getSites().forEach(site => {
//         const row = document.createElement('tr');
//         const data = document.createElement('td');
//         data.innerText = site.host;
//         row.appendChild(data);
//         table.appendChild(row);
//     });
//     return table;
// }

