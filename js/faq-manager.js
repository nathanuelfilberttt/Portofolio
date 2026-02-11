/**
 * FAQManager – accordion (satu item terbuka dalam satu waktu)
 * Dependencies: .faq-item, .faq-question
 */
export class FAQManager {
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
