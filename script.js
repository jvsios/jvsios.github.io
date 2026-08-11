const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav?.classList.toggle('is-open', !isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navToggle?.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('is-open');
    });
});

const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 16);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});
