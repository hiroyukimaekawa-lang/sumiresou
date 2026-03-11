document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.querySelector('.js-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    });

    // Run once on load just in case it's loaded mid-scroll
    if (window.scrollY > 50) {
        header.classList.add('is-scrolled');
    }

    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.js-hamburger');
    const mobileMenu = document.querySelector('.js-mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');
            document.body.style.overflow = hamburger.classList.contains('is-active') ? 'hidden' : '';
        });

        // Close menu when link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                mobileMenu.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Intersecion Observer for Scroll Fade-in ---
    const fadeElements = document.querySelectorAll('.section-fade');

    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before the element hits the bottom
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once it's visible so it doesn't fade out and in again
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

});
