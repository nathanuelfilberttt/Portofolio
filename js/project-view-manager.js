/**
 * ProjectViewManager – toggle tampilan Grid / Marquee
 * Dependencies: .view-btn[data-view], #projectsGrid, #projectsMarquee
 */
export class ProjectViewManager {
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
