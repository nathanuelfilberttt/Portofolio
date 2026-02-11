export class ScrollAnimationManager {
    constructor(selectors, options = {}) {
        this.selectors = selectors || '.showcase-gallery-item, .project-card, .service-item, .skill-category, .approach-item';
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
