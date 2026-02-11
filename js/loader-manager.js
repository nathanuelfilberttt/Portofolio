/**
 * LoaderManager – menangani layar loading (elemen opsional)
 * Dependency: #loader
 */
export class LoaderManager {
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
