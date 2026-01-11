// Typewriter Effect for Linux-style Terminal Path
(function () {
    'use strict';

    const phrases = [
        '/usr/bin/vijaykumar',
        '~/backend/engineer',
        '/etc/python/django'
    ];

    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Delete characters
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, pauseAfterDeleting);
                return;
            }
            setTimeout(type, deletingSpeed);
        } else {
            // Type characters
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, pauseAfterTyping);
                return;
            }
            setTimeout(type, typingSpeed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
})();
