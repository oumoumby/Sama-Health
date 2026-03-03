// ============================================================
// SAMA Health — Mobile Navigation (Hamburger Menu)
// Auto-injects hamburger button into every .navbar
// Works with dynamically updated navbars (Supabase Auth)
// ============================================================

(function () {
    'use strict';

    function createHamburgerBtn() {
        const btn = document.createElement('button');
        btn.className = 'hamburger-btn';
        btn.setAttribute('aria-label', 'Menu');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
        return btn;
    }

    function setupNavbar(navbar) {
        // Don't add a second hamburger if one already exists
        if (navbar.querySelector('.hamburger-btn')) return;

        const container = navbar.querySelector('.container');
        if (!container) return;

        const navLinks = container.querySelector('.nav-links');
        if (!navLinks) return;

        const btn = createHamburgerBtn();
        container.appendChild(btn);

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('nav-open');
            btn.classList.toggle('active', isOpen);
            btn.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when clicking a link
        navLinks.addEventListener('click', function (e) {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                navLinks.classList.remove('nav-open');
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        document.querySelectorAll('.navbar').forEach(function (navbar) {
            const btn = navbar.querySelector('.hamburger-btn');
            const navLinks = navbar.querySelector('.nav-links');
            if (!btn || !navLinks) return;

            if (!navbar.contains(e.target)) {
                navLinks.classList.remove('nav-open');
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.nav-links.nav-open').forEach(function (nl) {
                nl.classList.remove('nav-open');
                const btn = nl.closest('.navbar')?.querySelector('.hamburger-btn');
                if (btn) {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // Initialize all navbars on page load
    function initAll() {
        document.querySelectorAll('.navbar').forEach(setupNavbar);
    }

    // Run on DOMContentLoaded if not yet ready, otherwise run now
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    // Re-init when supabase-auth.js updates the navbar
    // Listen for custom event dispatched by supabase-auth.js
    document.addEventListener('navbarUpdated', initAll);

    // Also observe DOM mutations on navbars (fallback for dynamic changes)
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
            const navbar = m.target.closest('.navbar');
            if (navbar) setupNavbar(navbar);
        });
    });

    // Start observing once DOM is ready
    function startObserving() {
        document.querySelectorAll('.navbar .container').forEach(function (container) {
            observer.observe(container, { childList: true, subtree: true });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserving);
    } else {
        startObserving();
    }
})();
