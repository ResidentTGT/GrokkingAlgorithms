window.addEventListener('DOMContentLoaded', () => {
    if (location.hash) {
        moveToActiveSection(getSections());
        colorLinks(getLinks());
    }

    addLiClickListener(getLinks(), getSections());

    addAlgorithmsScrollEventListener(getSections());
    addMenuEventListener();
});

window.addEventListener('popstate', () => {
    colorLinks(getLinks());
});

function addLiClickListener(links, sections) {
    const mainBlock = document.body.querySelector('.algorithms');

    links.forEach(li => {
        li.addEventListener('click', e => {
            const name = e.target.attributes.getNamedItem('name').value;
            location.hash = name;
            const activeSection = sections.find(s => `${s.attributes.getNamedItem('name').value}` === name);
            mainBlock.scrollTo({ top: activeSection.offsetTop - mainBlock.offsetTop });
        });
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

function getSections() {
    return Array.from(document.querySelectorAll('.algorithm-layout'));
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

function moveToActiveSection(sections) {
    const activeSection = sections.find(s => `#${s.attributes.getNamedItem('name').value}` === location.hash);
    const mainBlock = document.body.querySelector('.algorithms');

    if (activeSection) {
        setTimeout(() => mainBlock.scrollTo({ top: activeSection.offsetTop - mainBlock.offsetTop }), 0);
    }
}

function addAlgorithmsScrollEventListener(sections) {
    document.body.querySelector('.algorithms').addEventListener('scroll', e => {
        const activeSection = sections
            .filter(s => e.target.scrollTop + e.target.offsetTop + 1 > s.offsetTop)
            .reverse()[0];
        if (activeSection && e.target.scrollTop + e.target.offsetHeight + 1 < e.target.scrollHeight) {
            location.hash = activeSection.attributes.getNamedItem('name').value;
        }
    });
}
