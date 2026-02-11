export class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.backToTop = document.getElementById('backToTop');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.onScroll();
            this.updateBackToTop();
        });
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }
        if (this.backToTop) {
            this.backToTop.addEventListener('click', () => this.scrollToTop());
        }
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.smoothScroll(e));
        });
    }

    onScroll() {
        if (this.navbar) {
            this.navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    }

    updateBackToTop() {
        if (!this.backToTop) return;
        if (window.scrollY > 400) {
            this.backToTop.classList.add('visible');
        } else {
            this.backToTop.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    toggleMenu() {
        if (!this.navbar || !this.hamburger) return;
        const isOpen = this.navbar.classList.toggle('is-open');
        this.hamburger.setAttribute('aria-expanded', isOpen);
        this.hamburger.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    closeMenu() {
        if (!this.navbar || !this.hamburger) return;
        this.navbar.classList.remove('is-open');
        this.hamburger.setAttribute('aria-expanded', 'false');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }

    smoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
            if (window.innerWidth <= 768) this.closeMenu();
            const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
            e.preventDefault();
        }
    }
}
