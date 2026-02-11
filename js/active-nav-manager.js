/**
 * ActiveNavManager – memberi highlight pada nav link sesuai section yang terlihat
 * Dependencies: section[id], .nav-link[href^="#"]
 */
export class ActiveNavManager {
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
