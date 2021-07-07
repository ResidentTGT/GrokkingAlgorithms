window.addEventListener('DOMContentLoaded', () => {
    const asideElement = document.querySelector('aside');
    const mainBlock = document.querySelector('.algorithms');
    const sections = Array.from(document.querySelectorAll('.algorithm-layout'));
    const menuButton = document.querySelector('header .menu');
    const titleElement = document.querySelector('header .title');
    const links = getLinks();

    if (location.hash) {
        moveToActiveSection(sections, mainBlock);
        colorLinks(links);
    }

    addTitleClickEventListener(titleElement, mainBlock);
    addLiClickEventListener(links, sections, mainBlock, menuButton, asideElement);
    addAlgorithmsClickEventListener(mainBlock, menuButton, asideElement);
    addAlgorithmsScrollEventListener(sections, mainBlock);
    addMenuClickEventListener(menuButton, asideElement);
});

window.addEventListener('popstate', () => {
    colorLinks(getLinks());
});

function addTitleClickEventListener(titleElement, mainBlock) {
    titleElement.addEventListener('click', () => scrollTo(mainBlock));
}

function moveToActiveSection(sections, mainBlock) {
    const activeSection = findActiveBlock(sections, location.hash.slice(1));

    if (activeSection) {
        setTimeout(() => scrollTo(mainBlock, activeSection), 500);
    }
}

function addLiClickEventListener(links, sections, mainBlock, menuButton, asideElement) {
    links.forEach(li => {
        li.addEventListener('click', e => {
            const name = e.target.attributes.getNamedItem('name').value;
            location.hash = name;

            const activeSection = findActiveBlock(sections, name);
            scrollTo(mainBlock, activeSection);

            if (getComputedStyle(menuButton).display !== 'none') {
                showAside(asideElement);
            }
        });
    });
}

function addAlgorithmsClickEventListener(mainBlock, menuButton, asideElement) {
    mainBlock.addEventListener('click', () => {
        if (getComputedStyle(menuButton).display !== 'none' && getComputedStyle(asideElement).display !== 'none') {
            showAside(asideElement);
        }
    });
}

function addAlgorithmsScrollEventListener(sections, mainBlock) {
    let timer;
    mainBlock.addEventListener('scroll', e => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const activeSection = sections.filter(s => e.target.scrollTop + window.innerHeight / 2 > s.offsetTop).pop();

            location.hash = activeSection ? activeSection.attributes.getNamedItem('name').value : '';
        }, 100);
    });
}

function addMenuClickEventListener(menuButton, asideElement) {
    menuButton.addEventListener('click', () => showAside(asideElement));
}

function showAside(asideElement) {
    asideElement.style.display = getComputedStyle(asideElement).display === 'none' ? 'block' : 'none';
}

function getLinks() {
    return Array.from(document.querySelectorAll('aside ul li'));
}

function findActiveBlock(sections, name) {
    return sections.find(s => `${s.attributes.getNamedItem('name').value}` === name);
}

function scrollTo(mainBlock, activeSection) {
    const offset = activeSection ? activeSection.offsetTop - mainBlock.offsetTop : 0;
    mainBlock.scrollTo({ top: offset });
}

function colorLinks(links) {
    links.forEach(l => {
        if (`#${l.attributes.getNamedItem('name').value}` === location.hash) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });
}
