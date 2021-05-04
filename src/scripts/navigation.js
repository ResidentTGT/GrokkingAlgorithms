window.addEventListener('DOMContentLoaded', () => {
    colorLinks(getLinks());
    if (location.hash) {
        moveToActiveSection(getSections());
    }
});

window.addEventListener('popstate', () => {
    colorLinks(getLinks());
});

function getLinks() {
    return Array.from(document.querySelectorAll('aside > a'));
}

function getSections() {
    return Array.from(document.querySelectorAll('.algorithm-layout > a'));
}

function colorLinks(links) {
    links.forEach(l => {
        if (l.attributes.getNamedItem('href').value === location.hash) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });
}

function moveToActiveSection(sections) {
    const activeSection = sections.find(s => `#${s.name}` === location.hash);

    if (activeSection) {
        setTimeout(() => document.body.querySelector('main').scrollTo({ top: activeSection.offsetTop }), 0);
    }
}
