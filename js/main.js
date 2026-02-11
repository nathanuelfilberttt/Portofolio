/**
 * Entry point – load app setelah DOM siap
 * HTML: <script type="module" src="js/main.js"></script>
 */
import { PortfolioApp } from './portfolio-app.js';

document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});
