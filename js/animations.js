// 0. Initialize Lenis Smooth Scroll
// Global variable to be accessed by other scripts
let lenis;

if (typeof Lenis !== 'undefined') {
    lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}

// 5. Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const observerReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // remove to replay animation when scrolling back up
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => observerReveal.observe(el));
