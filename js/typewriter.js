// Typewriter Effect for Linux-style Terminal Path
(function () {
    'use strict';

    const phrases = [
        'python manage.py runserver --deploy',
        'celery -A core worker -l info',
        'docker compose up -d postgres redis',
        '~/systems/erp_architecture.py',
        'gunicorn config.wsgi:application -w 4'
    ];

    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 85;
    const deletingSpeed = 40;
    const pauseAfterTyping = 2200;
    const pauseAfterDeleting = 450;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
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

    // Start typing after a short initial delay
    setTimeout(type, 800);
})();
