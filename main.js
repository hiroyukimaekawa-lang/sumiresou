document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu & Drawer
    const hamburger = document.getElementById('js-hamburger');
    const drawer = document.getElementById('js-drawer');
    const drawerLinks = document.querySelectorAll('.js-drawer-link');

    if (hamburger && drawer) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('is-active');
            if (isActive) {
                drawer.classList.add('is-active');
            } else {
                drawer.classList.remove('is-active');
            }
        });

        // Close drawer when a link is clicked
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                drawer.classList.remove('is-active');
            });
        });
    }

    // Remove Swiper initialization
    function initPanelSlider(slidesEl, intervalMs) {
        if (!slidesEl) return;
        const slides = Array.from(slidesEl.querySelectorAll('.hero-mv__slide'));
        if (slides.length === 0) return;

        let current = 0;
        slides[current].classList.add('is-active');

        setInterval(() => {
            slides[current].classList.remove('is-active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('is-active');
        }, intervalMs);
    }

    // Add Loading logic
    window.addEventListener('load', () => {
        // Init panel slides
        initPanelSlider(document.getElementById('slidesLeft'), 4000);
        setTimeout(() => {
            initPanelSlider(document.getElementById('slidesRight'), 4000);
        }, 1500);
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if(loading) loading.classList.add('is-hidden');
            
            // Activate Hero animation
            const hero = document.querySelector('.hero-mv');
            if(hero) hero.classList.add('is-ready');
        }, 2200);
    });

    // Scroll Animation (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 1200,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // Petal Falling Animation
    const petalsContainer = document.getElementById('js-petals');
    if (petalsContainer) {
        // SVG Data URIs for petals so they can have gradient colors
        const petalSVGs = [
            `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23d4c3e8' d='M50,10 C60,20 80,40 80,60 C80,80 60,90 50,90 C40,90 20,80 20,60 C20,40 40,20 50,10 Z' opacity='0.7'/%3E%3C/svg%3E`,
            `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23a07cc5' d='M50,10 C60,20 80,40 80,60 C80,80 60,90 50,90 C40,90 20,80 20,60 C20,40 40,20 50,10 Z' opacity='0.5'/%3E%3C/svg%3E`,
            `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='url(%23grad)' d='M50,10 C60,20 80,40 80,60 C80,80 60,90 50,90 C40,90 20,80 20,60 C20,40 40,20 50,10 Z'/%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23d4c3e8' /%3E%3Cstop offset='100%25' stop-color='%23a07cc5' /%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E`
        ];

        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            
            // Override with SVG petal shape
            const svgIndex = Math.floor(Math.random() * petalSVGs.length);
            petal.style.backgroundImage = `url("${petalSVGs[svgIndex]}")`;
            petal.style.backgroundSize = 'contain';
            petal.style.backgroundRepeat = 'no-repeat';
            petal.style.backgroundColor = 'transparent'; // Remove base CSS color
            
            // Random styling
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = Math.random() * 5 + 10 + 's'; // 10s ~ 15s
            petal.style.animationDelay = Math.random() * 10 + 's';
            
            // Random size
            const size = Math.random() * 15 + 15; // 15px ~ 30px
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            
            // Random horizontal drift using CSS vars
            const driftEnd = (Math.random() - 0.5) * 200; // -100px ~ 100px
            petal.style.setProperty('--drift-end', driftEnd + 'px');

            // Slightly random opacity
            petal.style.opacity = Math.random() * 0.4 + 0.4; // 0.4 ~ 0.8
            
            petalsContainer.appendChild(petal);
            
            // Garbage collect petals after they fall to prevent DOM overload
            setTimeout(() => {
                petal.remove();
            }, 25000); // Wait 25s which is longer than max max duration 15s + max delay 10s
        }

        // Initialize 20 petals
        for (let i = 0; i < 20; i++) {
            createPetal();
        }

        // Continously spawn new petals at interval
        setInterval(createPetal, 1200);
    }
});
