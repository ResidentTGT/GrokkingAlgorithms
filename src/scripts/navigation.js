window.addEventListener('DOMContentLoaded', () => {
    const mainBlock = document.querySelector('.algorithms');
    const sections = Array.from(document.querySelectorAll('.algorithm-layout'));
    const links = getLinks();

    if (location.hash) {
        moveToActiveSection(sections, mainBlock);
        colorLinks(links);
    }

    addLiClickListener(links, sections, mainBlock);
    addAlgorithmsScrollEventListener(sections, mainBlock);
    addMenuEventListener();
});

window.addEventListener('popstate', () => {
    colorLinks(getLinks());
});

function moveToActiveSection(sections, mainBlock) {
    const activeSection = findActiveBlock(sections, location.hash.slice(1));

    if (activeSection) {
        setTimeout(() => scrollTo(activeSection, mainBlock), 500);
    }
}

function addLiClickListener(links, sections, mainBlock) {
    links.forEach(li => {
        li.addEventListener('click', e => {
            const name = e.target.attributes.getNamedItem('name').value;
            location.hash = name;

            const activeSection = findActiveBlock(sections, name);
            scrollTo(activeSection, mainBlock);
        });
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

function addMenuEventListener() {
    const menu = document.querySelector('button.menu');

    menu.addEventListener('click', () => {
        const aside = document.querySelector('aside');
        aside.style.display = aside.style.display === 'block' ? 'none' : 'block';
    });
}

function getLinks() {
    return Array.from(document.querySelectorAll('aside ul li'));
}

function findActiveBlock(sections, name) {
    return sections.find(s => `${s.attributes.getNamedItem('name').value}` === name);
}

function scrollTo(activeSection, mainBlock) {
    mainBlock.scrollTo({ top: activeSection.offsetTop - mainBlock.offsetTop });
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
