/**
 * ShowcaseScrollManager – strip gambar bentuk pelangi bergerak ikut arah scroll:
 * - Page turun / diam → strip bergerak ke kiri
 * - Page naik → strip bergerak ke kanan
 */
export class ShowcaseScrollManager {
    constructor(options = {}) {
        this.stripId = options.stripId || 'showcaseArcStrip';
        this.galleryId = options.galleryId || 'showcaseGallery';
        this.sensitivity = options.sensitivity ?? 0.35;
        this.idleSpeed = options.idleSpeed ?? 0.4;
        this.maxOffset = options.maxOffset ?? 800;

        this.strip = null;
        this.gallery = null;
        this.lastScrollY = 0;
        this.offsetX = 0;
        this.idleTimer = null;
        this.rafId = null;
        this.isIdle = true;

        this.boundOnScroll = this.onScroll.bind(this);
    }

    init() {
        this.strip = document.getElementById(this.stripId);
        this.gallery = document.getElementById(this.galleryId);
        if (!this.strip || !this.gallery) return;

        this.lastScrollY = window.scrollY;
        this.offsetX = -180;
        window.addEventListener('scroll', this.boundOnScroll, { passive: true });
        this.applyOffset();
        this.idleTimer = setTimeout(() => {
            this.isIdle = true;
            this.startIdleDrift();
        }, 800);
    }

    onScroll() {
        const scrollY = window.scrollY;
        const delta = scrollY - this.lastScrollY;
        this.lastScrollY = scrollY;

        if (Math.abs(delta) < 1) return;

        this.isIdle = false;
        this.stopIdleDrift();
        if (this.idleTimer) clearTimeout(this.idleTimer);
        this.idleTimer = setTimeout(() => {
            this.isIdle = true;
            this.startIdleDrift();
        }, 150);

        if (delta > 0) {
            this.offsetX -= this.sensitivity * Math.min(delta, 80);
        } else {
            this.offsetX += this.sensitivity * Math.min(-delta, 80);
        }

        this.offsetX = Math.max(-this.maxOffset, Math.min(this.maxOffset, this.offsetX));
        this.applyOffset();
    }

    startIdleDrift() {
        if (this.rafId) return;
        const tick = () => {
            if (!this.isIdle || !this.strip) return;
            this.offsetX -= this.idleSpeed;
            if (this.offsetX < -this.maxOffset) this.offsetX = -this.maxOffset;
            this.applyOffset();
            this.rafId = requestAnimationFrame(tick);
        };
        this.rafId = requestAnimationFrame(tick);
    }

    stopIdleDrift() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    applyOffset() {
        if (!this.strip) return;
        this.strip.style.transform = `translateX(${this.offsetX}px)`;
    }

    destroy() {
        this.stopIdleDrift();
        if (this.idleTimer) clearTimeout(this.idleTimer);
        window.removeEventListener('scroll', this.boundOnScroll);
    }
}
