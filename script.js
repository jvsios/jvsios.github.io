document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 0. Typing effect for hero role (coder animation)
    // ----------------------------------------------------
    const typedRoleEl = document.getElementById('typed-role');
    if (typedRoleEl) {
        const roleText = 'Senior Software Engineer - iOS/Flutter';
        let i = 0;
        const typeSpeed = 90;
        const pauseBeforeStart = 600;

        function typeChar() {
            if (i < roleText.length) {
                typedRoleEl.textContent += roleText[i];
                i++;
                setTimeout(typeChar, typeSpeed);
            } else {
                // Optional: loop after a pause (comment out if you want one-shot only)
                setTimeout(() => {
                    typedRoleEl.textContent = '';
                    i = 0;
                    setTimeout(typeChar, 400);
                }, 3000);
            }
        }
        setTimeout(typeChar, pauseBeforeStart);
    }

    // ----------------------------------------------------
    // 1. Reveal Animations (Scroll Observer)
    // ----------------------------------------------------
    const observerOptions = {
        root: document.querySelector('.scroll-container'),
        threshold: 0.2 // Trigger when 20% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to section
                entry.target.classList.add('active');

                // Find and animate all .reveal elements inside
                const reveals = entry.target.querySelectorAll('.reveal, .reveal-delay');
                reveals.forEach(el => el.classList.add('visible'));

                // Optional: Once revealed, stop observing if you only want it to happen once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class to re-animate on scroll back? 
                // Mostly annoying for users, so usually kept once or simply toggled.
                // Keeping it simple:
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // ----------------------------------------------------
    // 2. 3D Tilt Effect for Phone & iPad Mockups
    // ----------------------------------------------------
    const phones = document.querySelectorAll('.phone-mockup, .ipad-mockup');

    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to center of screen
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;

        phones.forEach(phone => {
            // Apply subtle rotation based on mouse position
            // Only if the phone is currently in view (optional optimization)
            phone.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
    });

    // Reset when mouse leaves window (clear inline so CSS row rotation reapplies)
    document.addEventListener('mouseleave', () => {
        phones.forEach(phone => {
            phone.style.transform = '';
        });
    });

    // ----------------------------------------------------
    // 3. Smooth Nav Scrolling
    // ----------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
