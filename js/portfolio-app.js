import { LoaderManager } from './loader-manager.js';
import { NavigationManager } from './navigation-manager.js';
import { ThemeManager } from './theme-manager.js';
import { ScrollAnimationManager } from './scroll-animation-manager.js';
import { ShowcaseScrollManager } from './showcase-scroll-manager.js';
import { ProjectViewManager } from './project-view-manager.js';
import { FAQManager } from './faq-manager.js';
import { ActiveNavManager } from './active-nav-manager.js';

export class PortfolioApp {
    constructor() {
        this.loader = new LoaderManager('loader');
        this.nav = new NavigationManager();
        this.theme = new ThemeManager('themeToggle');
        this.scrollAnim = new ScrollAnimationManager();
        this.showcaseScroll = new ShowcaseScrollManager();
        this.showcaseScroll.init();
        this.projectView = new ProjectViewManager();
        this.faq = new FAQManager();
        this.activeNav = new ActiveNavManager();
    }
}
