(function (window) {
    'use strict';

    //
    class LoaderManager {
        constructor(loaderId, delay = 1200) {
            this.el = document.getElementById(loaderId);
            this.delay = delay;
            if (this.el) this.init();
        }

        init() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.el.classList.add('hidden');
                    setTimeout(() => {
                        this.el.style.display = 'none';
                    }, 600);
                }, this.delay);
            });
        }
    }

    /**
     * NavigationManager – scroll state, back-to-top, mobile menu, smooth scroll
     */
    class NavigationManager {
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

    /**
     * ThemeManager – light/dark toggle with localStorage
     */
    class ThemeManager {
        constructor(toggleId) {
            this.toggle = document.getElementById(toggleId);
            const saved = localStorage.getItem('theme');
            this.isDark = saved ? saved === 'dark' : true;
            if (this.toggle) this.init();
        }

        init() {
            this.apply(this.isDark);
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }

        toggleTheme() {
            this.isDark = !this.isDark;
            localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
            this.apply(this.isDark);
        }

        apply(isDark) {
            const r = document.documentElement;
            this.toggle.classList.toggle('active', !isDark);
            if (isDark) {
                r.style.setProperty('--bg', '#050505');
                r.style.setProperty('--bg-elevated', '#0f0f0f');
                r.style.setProperty('--bg-glass', 'rgba(20, 20, 20, 0.7)');
                r.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.02)');
                r.style.setProperty('--text', '#ffffff');
                r.style.setProperty('--text-muted', '#999999');
                r.style.setProperty('--text-subtle', '#555555');
                r.style.setProperty('--border', 'rgba(255, 255, 255, 0.08)');
                r.style.setProperty('--border-hover', 'rgba(255, 255, 255, 0.2)');
                r.style.setProperty('--accent', '#ffffff');
                r.style.setProperty('--accent-muted', 'rgba(255, 255, 255, 0.1)');
                r.style.setProperty('--accent-glow', 'rgba(0, 68, 255, 0.5)');
            } else {
                r.style.setProperty('--bg', '#ffffff');
                r.style.setProperty('--bg-elevated', '#f5f5f5');
                r.style.setProperty('--bg-glass', 'rgba(255, 255, 255, 0.9)');
                r.style.setProperty('--bg-card', 'rgba(0, 0, 0, 0.03)');
                r.style.setProperty('--text', '#111111');
                r.style.setProperty('--text-muted', '#555555');
                r.style.setProperty('--text-subtle', '#888888');
                r.style.setProperty('--border', 'rgba(0, 0, 0, 0.1)');
                r.style.setProperty('--border-hover', 'rgba(0, 0, 0, 0.2)');
                r.style.setProperty('--accent', '#000000');
                r.style.setProperty('--accent-muted', 'rgba(0, 0, 0, 0.05)');
                r.style.setProperty('--accent-glow', 'rgba(0, 68, 255, 0.3)');
            }
        }
    }

    /**
     * ScrollAnimationManager – IntersectionObserver for reveal-on-scroll
     */
    class ScrollAnimationManager {
        constructor(selectors, options = {}) {
            this.selectors = selectors || '.gallery-item, .project-card, .service-item, .skill-category, .approach-item';
            this.options = { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options };
            this.elements = document.querySelectorAll(this.selectors);
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, this.options);

            this.elements.forEach((el, i) => {
                if (!el.classList.contains('gallery-item')) {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(24px)';
                    el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                }
                el.style.transitionDelay = `${(i % 4) * 0.08}s`;
                observer.observe(el);
            });
        }
    }

    /** ProjectViewManager – toggles Grid / Marquee view */
    class ProjectViewManager {
        constructor() {
            this.buttons = document.querySelectorAll('.view-btn[data-view]');
            this.grid = document.getElementById('projectsGrid');
            this.marquee = document.getElementById('projectsMarquee');
            this.init();
        }

        init() {
            this.buttons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const view = e.currentTarget.dataset.view;
                    this.buttons.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    if (view === 'grid') {
                        if (this.grid) this.grid.style.display = 'grid';
                        if (this.marquee) this.marquee.classList.remove('active');
                    } else {
                        if (this.grid) this.grid.style.display = 'none';
                        if (this.marquee) this.marquee.classList.add('active');
                    }
                });
            });
        }
    }

    /**
     * FAQManager – accordion (one open at a time)
     */
    class FAQManager {
        constructor() {
            this.items = document.querySelectorAll('.faq-item');
            this.buttons = document.querySelectorAll('.faq-question');
            this.init();
        }

        init() {
            this.buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = btn.closest('.faq-item');
                    const isOpening = !item.classList.contains('open');
                    this.items.forEach(other => other.classList.remove('open'));
                    if (isOpening) item.classList.add('open');
                });
            });
        }
    }

    /**
     * ActiveNavManager – highlights nav link for current section (optional)
     */
    class ActiveNavManager {
        constructor() {
            this.sections = document.querySelectorAll('section[id]');
            this.links = document.querySelectorAll('.nav-link[href^="#"]');
            window.addEventListener('scroll', () => this.update(), { passive: true });
            this.update();
        }

        update() {
            const top = window.scrollY + 120;
            let current = '';
            this.sections.forEach(sec => {
                if (sec.offsetTop <= top) current = sec.id;
            });
            this.links.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', href === '#' + current);
            });
        }
    }

    /**
     * PortfolioApp – composition root
     */
    class PortfolioApp {
        constructor() {
            this.loader = new LoaderManager('loader');
            this.nav = new NavigationManager();
            this.theme = new ThemeManager('themeToggle');
            this.scrollAnim = new ScrollAnimationManager();
            this.projectView = new ProjectViewManager();
            this.faq = new FAQManager();
            this.activeNav = new ActiveNavManager();
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.portfolioApp = new PortfolioApp();
    });

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            LoaderManager,
            NavigationManager,
            ThemeManager,
            ScrollAnimationManager,
            ProjectViewManager,
            FAQManager,
            ActiveNavManager,
            PortfolioApp
        };
    }
})(window);
