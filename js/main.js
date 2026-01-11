'use strict';

// 1. Mobile Menu Auto-close
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
            bsCollapse.hide();
        }
    });
});

// 3. ScrollSpy
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');

const observerSpy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (!id) return;
            navLinks.forEach(link => {
                link.classList.remove('active-section');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active-section');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observerSpy.observe(section));

// 4. Scroll to Top
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        if (typeof lenis !== 'undefined') {
            lenis.scrollTo(0) // Use Lenis for smooth scroll to top
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// 6. Initialize Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
