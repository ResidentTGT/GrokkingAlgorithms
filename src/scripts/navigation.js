window.addEventListener('DOMContentLoaded', () => {
    colorLink();
});

window.addEventListener('popstate', () => {
    colorLink();
});

function colorLink() {
    const links = Array.from(document.querySelectorAll('aside > a'));

    links.forEach(l => {
        if (l.attributes.getNamedItem('href').value === location.hash) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });
}
