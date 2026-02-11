export class ThemeManager {
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
        r.setAttribute('data-theme', isDark ? 'dark' : 'light');
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
