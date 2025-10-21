// === DARK MODE FUNCTIONALITY ===
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');
        if (theme === 'light') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        // theme initialized
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        setTimeout(window.updateNavigationStyle, 100);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    initTheme();
});

// === SCROLL ANIMATIONS ===
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }       
        });
    }, observerOptions);

    // Add fade-in class to elements
    const elementsToAnimate = document.querySelectorAll('.section-header, .service-card, .project-card, .contact-info, .contact-form');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// === HERO ANIMATION (Lottie placeholder) ===
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('heroAnimation');
    if (!container) return;

    // Load lottie-web if available via CDN
    function mountAnimation() {
        if (!window.lottie) return;
        try {
            window.lottie.loadAnimation({
                container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: 'images/hero-logo.json' // replace with your JSON path
            });
        } catch (_) {}
    }

    if (window.lottie) {
        mountAnimation();
    } else {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lottie-web/build/player/lottie.min.js';
        script.async = true;
        script.onload = mountAnimation;
        document.head.appendChild(script);
    }
});

// === NAVIGATION ADAPTATION ===
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    let ticking = false;
    let lastScrollY = window.scrollY;
    let revealThreshold = 8; // px delta before toggling

    function updateNavigationStyle() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        navbar.classList.remove('over-hero', 'over-light', 'over-gray');

        let currentSection = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const sectionId = currentSection.id;
            const sectionClass = currentSection.className;
            if (sectionId === 'home') {
                navbar.classList.add('over-hero');
            } else if (sectionClass.includes('services') || sectionClass.includes('projects')) {
                navbar.classList.add('over-gray');
            } else {
                navbar.classList.add('over-light');
            }
        } else if (scrollY < windowHeight * 0.5) {
            navbar.classList.add('over-hero');
        } else {
            navbar.classList.add('over-light');
        }
        ticking = false;

        // Header compact state
        if (scrollY > 10) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavigationStyle);
            ticking = true;
        }
    }

    // Expose so theme toggle can call it
    window.updateNavigationStyle = updateNavigationStyle;

    function handleHideOnScroll() {
        if (document.body.classList.contains('menu-open')) {
            navbar.classList.remove('navbar--hidden');
            return; // don't hide while menu is open
        }
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;
        if (Math.abs(delta) > revealThreshold) {
            if (delta > 0 && currentY > 80) {
                navbar.classList.add('navbar--hidden');
            } else {
                navbar.classList.remove('navbar--hidden');
            }
            lastScrollY = currentY;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('scroll', handleHideOnScroll, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    updateNavigationStyle();

    // mark aria-current on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    let ariaTicking = false;
    
    function updateAriaCurrent() {
        let currentSectionId = 'home';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSectionId = section.id || currentSectionId;
            }
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href') || '';
            const matches = href.startsWith('#') && href.slice(1) === currentSectionId;
            if (matches) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
        ariaTicking = false;
    }

    function requestAriaTick() {
        if (!ariaTicking) {
            requestAnimationFrame(updateAriaCurrent);
            ariaTicking = true;
        }
    }

    window.addEventListener('scroll', requestAriaTick, { passive: true });
    window.addEventListener('resize', requestAriaTick, { passive: true });
    updateAriaCurrent();
});

// === PROJECTS FILTER ===
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filterValue === 'all' || category === filterValue;
                if (!shouldShow) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            setTimeout(() => {
                let delay = 0;
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const shouldShow = filterValue === 'all' || category === filterValue;
                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, delay);
                        delay += 100;
                    }
                });
            }, 300);
        });
    });
});

// === SMOOTH SCROLL FUNCTIONS ===
function scrollToProjects() {
    const element = document.getElementById('projects');
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    }
}

function scrollToContact() {
    const element = document.getElementById('contact');
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
        });
    }
}

// === FORM HANDLING ===
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mesajul tău a fost trimis! Te voi contacta în cel mai scurt timp.');
            contactForm.reset();
        });
    }
});

// === HAMBURGER MENU TOGGLE ===
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenuParent = navMenu ? navMenu.parentElement : null;
    const navMenuPlaceholder = document.createComment('nav-menu-placeholder');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            const next = !expanded;
            hamburger.setAttribute('aria-expanded', String(next));
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            document.body.classList.toggle('menu-open', isOpen);

            // Reparent nav menu to body while open so it's not clipped by navbar transforms
            if (isOpen) {
                if (navMenuParent && navMenu.parentElement === navMenuParent) {
                    navMenuParent.insertBefore(navMenuPlaceholder, navMenu);
                }
                document.body.appendChild(navMenu);
            } else {
                if (navMenuParent && navMenuPlaceholder.parentNode) {
                    navMenuPlaceholder.parentNode.replaceChild(navMenu, navMenuPlaceholder);
                }
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
                if (navMenuParent && navMenuPlaceholder.parentNode) {
                    navMenuPlaceholder.parentNode.replaceChild(navMenu, navMenuPlaceholder);
                }
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = event.target.closest('.nav-container');
            const isClickOnHamburger = event.target.closest('.hamburger');
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
                if (navMenuParent && navMenuPlaceholder.parentNode) {
                    navMenuPlaceholder.parentNode.replaceChild(navMenu, navMenuPlaceholder);
                }
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
                if (navMenuParent && navMenuPlaceholder.parentNode) {
                    navMenuPlaceholder.parentNode.replaceChild(navMenu, navMenuPlaceholder);
                }
            }
        });
    }
});


