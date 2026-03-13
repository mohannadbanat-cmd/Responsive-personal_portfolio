/* ============================================
   MOHANNAD BANAT — WEBSITE SCRIPTS
   ============================================ */

// ===== DOM ELEMENTS =====
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('#navbar');
const header = document.querySelector('#header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar a');

// ===== MOBILE MENU TOGGLE =====
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// ===== SCROLL EVENTS =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header background on scroll
    header.classList.toggle('scrolled', scrollY > 80);

    // Active nav link on scroll
    sections.forEach(section => {
        const top = section.offsetTop - 200;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Close mobile menu on scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

// ===== CLOSE MENU ON LINK CLICK =====
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// ===== TYPED.JS =====
const typed = new Typed('.typed-text', {
    strings: [
        'Entrepreneur',
        'Business Developer',
        'Strategic Thinker',
        'Academic Consultant',
        'Visionary Leader'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    showCursor: false
});

// ===== SCROLL REVEAL =====
ScrollReveal({
    distance: '60px',
    duration: 1500,
    delay: 200,
    reset: false
});

// Hero
ScrollReveal().reveal('.hero-greeting, .hero-name', { origin: 'left' });
ScrollReveal().reveal('.hero-title, .hero-description', { origin: 'left', delay: 300 });
ScrollReveal().reveal('.hero-cta, .hero-socials', { origin: 'bottom', delay: 500 });
ScrollReveal().reveal('.hero-image', { origin: 'right', delay: 400 });

// About
ScrollReveal().reveal('.section-header', { origin: 'top' });
ScrollReveal().reveal('.about-image', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });
ScrollReveal().reveal('.stat-item', { origin: 'bottom', interval: 150 });

// Expertise
ScrollReveal().reveal('.expertise-card', { origin: 'bottom', interval: 150 });

// Ventures
ScrollReveal().reveal('.timeline-item', { origin: 'left', interval: 200 });
ScrollReveal().reveal('.education-card', { origin: 'bottom', interval: 150 });

// Contact
ScrollReveal().reveal('.contact-info-card', { origin: 'left', interval: 150 });
ScrollReveal().reveal('.contact-form', { origin: 'right' });

// ===== FLOATING PARTICLES (HERO) =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(201, 169, 110, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }

    // Add CSS animation via style tag
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.3;
            }
            25% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.2);
                opacity: 0.8;
            }
            50% {
                transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0.8);
                opacity: 0.5;
            }
            75% {
                transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.1);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
}

createParticles();

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';

        // Build form data explicitly
        const body = new URLSearchParams({
            'form-name': 'contact-form',
            'Name': form.querySelector('[name="Name"]').value,
            'Email': form.querySelector('[name="Email"]').value,
            'Subject': form.querySelector('[name="Subject"]').value,
            'Message': form.querySelector('[name="Message"]').value
        }).toString();

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        })
        .then(response => {
            if (response.ok) {
                formMsg.textContent = 'Message sent successfully!';
                formMsg.style.color = '#61b752';
                form.reset();
            } else {
                formMsg.textContent = 'Something went wrong. Please try again.';
                formMsg.style.color = '#e74c3c';
            }
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
            setTimeout(() => { formMsg.textContent = ''; }, 5000);
        })
        .catch(() => {
            formMsg.textContent = 'Network error. Please try again.';
            formMsg.style.color = '#e74c3c';
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
            setTimeout(() => { formMsg.textContent = ''; }, 5000);
        });
    });
}