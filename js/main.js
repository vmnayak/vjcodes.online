'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic (Light / Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.theme-icon-sun');
    const moonIcon = document.querySelector('.theme-icon-moon');
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    function applyThemeUI(theme) {
        if (theme === 'light') {
            if (sunIcon) sunIcon.classList.add('d-none');
            if (moonIcon) moonIcon.classList.remove('d-none');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#f8fafc');
        } else {
            if (sunIcon) sunIcon.classList.remove('d-none');
            if (moonIcon) moonIcon.classList.add('d-none');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#090a0f');
        }
    }

    // Sync initial UI with active theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    applyThemeUI(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            applyThemeUI(newTheme);
        });
    }

    // Listen to system OS color preference changes if user hasn't explicitly set one
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            if (!localStorage.getItem('theme')) {
                const systemTheme = e.matches ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', systemTheme);
                applyThemeUI(systemTheme);
            }
        });
    }

    // 2. Mobile Menu Auto-close on link click
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    // 3. ScrollSpy for Navbar Active State
    const sections = document.querySelectorAll('section, header');
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
    }, { threshold: 0.25 });

    sections.forEach(section => observerSpy.observe(section));

    // 4. Scroll to Top Button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            if (typeof lenis !== 'undefined' && lenis) {
                lenis.scrollTo(0);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // 5. One-Click Copy Email to Clipboard with Toast Notification
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    const copyToast = document.getElementById('copy-toast');

    function showToast(message) {
        if (!copyToast) return;
        if (message) {
            const span = copyToast.querySelector('span');
            if (span) span.textContent = message;
        }
        copyToast.classList.add('show');
        setTimeout(() => {
            copyToast.classList.remove('show');
        }, 2800);
    }

    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const email = btn.getAttribute('data-email') || 'hello@vijaynayak.dev';
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    // Fallback for non-https / older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                showToast(`Copied ${email} to clipboard!`);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showToast(`Email: ${email}`);
            }
        });
    });

    // 6. Initialize Bootstrap Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));
});
